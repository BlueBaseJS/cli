import * as webpack from 'webpack';
import { Engine, Utils } from '@blueeast/bluerain-cli-core';
import logger from '../../logger';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import AssetsPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const HappyPack = require('happypack');
// const WebpackMd5Hash = require('webpack-md5-hash');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

export type WebpackConfig = webpack.Configuration;

export type BuildOptions = {
	bootPath: string;
	target: 'client' | 'server';
	mode: 'production' | 'development' | 'none';
	engine: Engine;
};

const ifElse = Utils.ifElse;
const removeNil = Utils.removeNil;

const smp = new SpeedMeasurePlugin();

// This plugin allows you to provide final adjustments your webpack
// configurations for each bundle before they get processed.
//
// I would recommend looking at the "webpack-merge" module to help you with
// merging modifications to each config.
export default (webpackConfigInput: WebpackConfig, buildOptions: BuildOptions): WebpackConfig => {

	const { bootPath, target, mode, engine } = buildOptions;

	/////////////////
	//// Helpers ////
	/////////////////
	const config = (key: string) => engine.Configs.get(key);
	const useOwn = (loaderStr: string) => path.resolve(__dirname, `../../../node_modules/${loaderStr}`)
	// const fromRoot = (loaderStr: string) => path.resolve(__dirname, `../../../${loaderStr}`);

	const isProd = mode === 'production' ? true : false;
	const isDev = !isProd;
	const isClient = target === 'client';
	const isServer = target === 'server';
	const isNode = !isClient;

	// Preconfigure some ifElse helper instnaces. See the util docs for more
	// information on how this util works.
	const ifDev = ifElse(isDev);
	// const ifProd = ifElse(isProd);
	const ifNode = ifElse(isNode);
	const ifClient = ifElse(isClient);
	const ifDevClient = ifElse(isDev && isClient);
	const ifProdClient = ifElse(isProd && isClient);

	////////////////////
	//// Initialize ////
	////////////////////

	logger.log({
		level: 'info',
		title: 'Webpack Config',
		message: `Creating ${isProd
			? 'an optimised'
			: 'a development'} bundle configuration for the "${target}"`,
	});

	// Extract configs of this bundle
	const bundleConfig =
		isServer || isClient
			? // This is either our "server" or "client" bundle.
			config(`bundles.${target}`)
			: // Otherwise it must be an additional node bundle.
			config(`additionalNodeBundles.${target}`);

	if (!bundleConfig) {
		throw Error(`No bundle configuration exists for target: ${target}`);
	}

	/////////////////
	//// Webpack ////
	/////////////////
	const webpackConfig: WebpackConfig = {

		// TODO: do this properly
		...webpackConfigInput,

		// Mode
		mode: ifDev('development', 'production'),

		target: isClient
			? // Only our client bundle will target the web as a runtime.
			'web'
			: // Any other bundle must be targetting node as a runtime.
			'node',

		// Ensure that webpack polyfills the following node features for use
		// within any bundles that are targetting node as a runtime. This will be
		// ignored otherwise.
		node: {
			__dirname: true,
			__filename: true,
		},

		// TODO:
		// profile: true,//ifDev(false, true),

		// Define our entry chunks for our bundle.
		entry: {

			// We name our entry files "index" as it makes it easier for us to
			// import bundle output files (e.g. `import server from './build/server';`)
			index: removeNil([

				// // We are using polyfill.io instead of the very heavy babel-polyfill.
				// // Therefore we need to add the regenerator-runtime as polyfill.io
				// // doesn't support this.
				// ifClient(useOwn('regenerator-runtime/runtime')),

				// Extends hot reloading with the ability to hot path React Components.
				// This should always be at the top of your entries list. Only put
				// polyfills above it.
				ifDevClient(useOwn('react-hot-loader/patch')),

				// Required to support hot reloading of our client.
				ifDevClient(
					() =>
						useOwn(`webpack-hot-middleware/client?reload=true&path=http://${config('host')}:${config(
							'clientDevServerPort',
						)}/__webpack_hmr`),
				),

				// BlueRain boot options file, AKA boot.js
				ifClient(bootPath),

				// The source entry file for the bundle.
				path.resolve(bundleConfig.srcEntryFile),
			]),
		},


		// Bundle output configuration.
		output: {

			// The dir in which our bundle should be output.
			path: path.resolve(bundleConfig.outputPath),

			// The filename format for our bundle's entries.
			filename: ifProdClient(

				// For our production client bundles we include a hash in the filename.
				// That way we won't hit any browser caching issues when our bundle
				// output changes.
				// Note: as we are using the WebpackMd5Hash plugin, the hashes will
				// only change when the file contents change. This means we can
				// set very aggressive caching strategies on our bundle output.
				'[name]-[chunkhash].js',

				// For any other bundle (typically a server/node) bundle we want a
				// determinable output name to allow for easier importing/execution
				// of the bundle by our scripts.
				'[name].js',
			),

			// The name format for any additional chunks produced for the bundle.
			chunkFilename: '[name]-[chunkhash].js',

			// When targetting node we will output our bundle as a commonjs2 module.
			libraryTarget: ifNode('commonjs2', 'var'),

			// This is the web path under which our webpack bundled client should
			// be considered as being served from.
			publicPath: ifDev(

				// As we run a seperate development server for our client and server
				// bundles we need to use an absolute http path for the public path.
				`http://${config('host')}:${config('clientDevServerPort')}${config(
					'bundles.client.webPath',
				)}`,

				// Otherwise we expect our bundled client to be served from this path.
				bundleConfig.webPath,
			),
		},

		// Source map settings.
		devtool: ifElse(
			// Include source maps for ANY node bundle so that we can support
			// nice stack traces for errors (the source maps get consumed by
			// the `node-source-map-support` module to allow for this).
			isNode ||
			// Always include source maps for any development build.
			isDev ||
			// Allow for the following flag to force source maps even for production
			// builds.
			config('includeSourceMapsForOptimisedClientBundle'),
		)(
			// Produces an external source map (lives next to bundle output files).
			'source-map',
			// Produces no source map.
			'hidden-source-map',
		),

		// Performance budget feature.
		// This enables checking of the output bundle size, which will result in
		// warnings/errors if the bundle sizes are too large.
		// We only want this enabled for our production client.  Please
		// see the webpack docs on how you can configure this to your own needs:
		// https://webpack.js.org/configuration/performance/
		performance: ifProdClient(
			// Enable webpack's performance hints for production client builds.
			{ hints: 'warning' },
			// Else we have to set a value of "false" if we don't want the feature.
			false,
		),

		resolve: {
			// These extensions are tried when resolving a file.
			extensions: config('bundleSrcTypes').map((ext: string) => `.${ext}`),

			// This is required for the modernizr-loader
			// @see https://github.com/peerigon/modernizr-loader
			alias: {
				// BlueRain boot options file, AKA boot.js
				BLUERAIN_BOOT_OPTIONS: bootPath,

				'react-native': useOwn('react-native-web'),
			},
		},

		// We don't want our node_modules to be bundled with any bundle that is
		// targetting the node environment, prefering them to be resolved via
		// native node module system. Therefore we use the `webpack-node-externals`
		// library to help us generate an externals configuration that will
		// ignore all the node_modules.
		externals: removeNil([
			ifNode(() =>
				nodeExternals(
					// Some of our node_modules may contain files that depend on our
					// webpack loaders, e.g. CSS or SASS.
					// For these cases please make sure that the file extensions are
					// registered within the following configuration setting.
					{
						whitelist: removeNil([
							// We always want the source-map-support included in
							// our node target bundles.
							useOwn('source-map-support/register'),
						])
							// And any items that have been whitelisted in the config need
							// to be included in the bundling process too.
							.concat(config('nodeExternalsFileTypeWhitelist') || []),
					},
				),
			),
		]),

		// Webpack 4 automatically runs UglifyPlugin and other optimization processes.
		// It can be configured here:
		optimization: {
			minimizer: ifProdClient([
				new UglifyJsPlugin({
					uglifyOptions: {
						ecma: 8,
						compress: {
							warnings: false,
							// Disabled because of an issue with Uglify breaking seemingly valid code:
							// https://github.com/facebook/create-react-app/issues/2376
							// Pending further investigation:
							// https://github.com/mishoo/UglifyJS2/issues/2011
							comparisons: false,
						},
						mangle: {
							safari10: true,
						},
						output: {
							comments: false,
							// Turned on because emoji and regex is not minified properly using default
							// https://github.com/facebook/create-react-app/issues/2488
							ascii_only: true,
						},
					},
					// Use multi-process parallel running to improve the build speed
					// Default number of concurrent runs: os.cpus().length - 1
					parallel: true,
					// Enable file caching
					cache: true,
					sourceMap: config('includeSourceMapsForOptimisedClientBundle'),
				}),
				// new OptimizeCSSAssetsPlugin({})
			]),
		},

		plugins: removeNil([
			// This grants us source map support, which combined with our webpack
			// source maps will give us nice stack traces for our node executed
			// bundles.
			// We use the BannerPlugin to make sure all of our chunks will get the
			// source maps support installed.
			ifNode(
				() =>
					new webpack.BannerPlugin({
						banner: 'require("source-map-support").install();',
						raw: true,
						entryOnly: false,
					}),
			),

			// // Implement webpack 3 scope hoisting that will remove function wrappers
			// // around your modules you may see some small size improvements. However,
			// // the significant improvement will be how fast the JavaScript loads in the browser.
			// ifProdClient(new webpack.optimize.ModuleConcatenationPlugin()),

			// // We use this so that our generated [chunkhash]'s are only different if
			// // the content for our respective chunks have changed.  This optimises
			// // our long term browser caching strategy for our client bundle, avoiding
			// // cases where browsers end up having to download all the client chunks
			// // even though 1 or 2 may have only changed.
			// ifClient(() => new WebpackMd5Hash()),

			// These are process.env flags that you can use in your code in order to
			// have advanced control over what is included/excluded in your bundles.
			// For example you may only want certain parts of your code to be
			// included/ran under certain conditions.
			//
			// Any process.env.X values that are matched will be code substituted for
			// the associated values below.
			//
			// For example you may have the following in your code:
			//   if (process.env.BUILD_FLAG_IS_CLIENT === 'true') {
			//     console.log('Foo');
			//   }
			//
			// If the BUILD_FLAG_IS_CLIENT was assigned a value of `false` the above
			// code would be converted to the following by the webpack bundling
			// process:
			//   if ('false' === 'true') {
			//     console.log('Foo');
			//   }
			//
			// When your bundle is built using the UglifyJsPlugin unreachable code
			// blocks like in the example above will be removed from the bundle
			// final output. This is helpful for extreme cases where you want to
			// ensure that code is only included/executed on specific targets, or for
			// doing debugging.
			//
			// NOTE: We are stringifying the values to keep them in line with the
			// expected type of a typical process.env member (i.e. string).
			// @see https://github.com/ctrlplusb/react-universally/issues/395
			new webpack.EnvironmentPlugin({
				// It is really important to use NODE_ENV=production in order to use
				// optimised versions of some node_modules, such as React.
				NODE_ENV: isProd ? 'production' : 'development',
				// Is this the "client" bundle?
				BUILD_FLAG_IS_CLIENT: JSON.stringify(isClient),
				// Is this the "server" bundle?
				BUILD_FLAG_IS_SERVER: JSON.stringify(isServer),
				// Is this a node bundle?
				BUILD_FLAG_IS_NODE: JSON.stringify(isNode),
				// Is this a development build?
				BUILD_FLAG_IS_DEV: JSON.stringify(isDev),
			}),

			// Generates a JSON file containing a map of all the output files for
			// our webpack bundle.  A necessisty for our server rendering process
			// as we need to interogate these files in order to know what JS/CSS
			// we need to inject into our HTML. We only need to know the assets for
			// our client bundle.
			ifClient(
				() =>
					new AssetsPlugin({
						filename: config('bundleAssetsFileName'),
						path: bundleConfig.outputPath,
					}),
			),

			// We don't want webpack errors to occur during development as it will
			// kill our dev servers.
			ifDev(() => new webpack.NoEmitOnErrorsPlugin()),

			// We need this plugin to enable hot reloading of our client.
			ifDevClient(() => new webpack.HotModuleReplacementPlugin({
				multiStep: true,
			})),

			// // For our production client we need to make sure we pass the required
			// // configuration to ensure that the output is minimized/optimized.
			// ifProdClient(
			// 	() =>
			// 		new webpack.LoaderOptionsPlugin({
			// 			minimize: true,
			// 		}),
			// ),

			// For the production build of the client we need to extract the CSS into
			// CSS files.
			new MiniCssExtractPlugin({
				filename: ifDev('[name].css', '[name].[hash].css'),
				chunkFilename: ifDev('[id].css', '[id].[hash].css'),
			}),

			// -----------------------------------------------------------------------
			// START: HAPPY PACK PLUGINS
			//
			// @see https://github.com/amireh/happypack/
			//
			// HappyPack allows us to use threads to execute our loaders. This means
			// that we can get parallel execution of our loaders, significantly
			// improving build and recompile times.
			//
			// This may not be an issue for you whilst your project is small, but
			// the compile times can be signficant when the project scales. A lengthy
			// compile time can significantly impare your development experience.
			// Therefore we employ HappyPack to do threaded execution of our
			// "heavy-weight" loaders.

			// // HappyPack 'javascript' instance.
			// new HappyPack({
			// 	id: 'happypack-javascript',
			// 	verbose: false,
			// 	threads: 4,
			// 	loaders: [
			// 		{
			// 			// We will use babel to do all our JS processing.
			// 			path: useOwn('babel-loader'),

			// 			// We will create a babel config and pass it through the plugin
			// 			// defined in the project configuration, allowing additional
			// 			// items to be added.
			// 			query:
			// 				// Our "standard" babel config.
			// 				{
			// 					// We need to ensure that we do this otherwise the babelrc will
			// 					// get interpretted and for the current configuration this will mean
			// 					// that it will kill our webpack treeshaking feature as the modules
			// 					// transpilation has not been disabled within in.
			// 					babelrc: false,

			// 					plugins: [
			// 						// Required to support react hot loader.
			// 						// ifDevClient(useOwn('react-hot-loader/babel')),

			// 					].filter(x => x != null),
			// 				},
			// 		},
			// 	],
			// }),

			// HappyPack 'typescript' instance.
			new HappyPack({
				id: 'happypack-typescript',
				verbose: false,
				threads: 4,
				loaders: [
					{
						loader: useOwn('babel-loader'),
						options: {
							babelrc: false,
							plugins: ['react-hot-loader/babel'],
						},
					},
					{
						loader: useOwn('ts-loader'),
						options: {
							transpileOnly: true,
							happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
						}
					}
				],
			}),

			// Typescript
			new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),

			// HappyPack 'css' instance for development client.
			ifDevClient(() =>
				new HappyPack({
					id: 'happypack-devclient-css',
					verbose: false,
					threads: 4,
					loaders: [
						useOwn('style-loader'),
						{
							path: useOwn('css-loader'),
							// Include sourcemaps for dev experience++.
							query: { sourceMap: true },
						},
					],
				})
			),

			// // END: HAPPY PACK PLUGINS
			// // -----------------------------------------------------------------------

		]),


		module: {

			// Use strict export presence so that a missing export becomes a compile error.
			strictExportPresence: true,

			rules: [
				{
					// "oneOf" will traverse all imports with following loaders until one will
					// match the requirements. When no loader matches it will fallback to the
					// "file" loader at the end of the loader list.
					oneOf: removeNil([

						// // JAVASCRIPT
						// {
						// 	test: /\.jsx?$/,
						// 	// We will defer all our js processing to the happypack plugin
						// 	// named "happypack-javascript".
						// 	// See the respective plugin within the plugins section for full
						// 	// details on what loader is being implemented.
						// 	loader: useOwn('happypack/loader?id=happypack-javascript'),
						// 	include: removeNil([
						// 		...bundleConfig.srcPaths,
						// 		// ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
						// 	]),
						// },

						// Typescript
						{
							test: /\.tsx?$/,
							exclude: /node_modules/,
							// TODO: why does it throw on include?
							// include: removeNil([
							// 	...bundleConfig.srcPaths,
							// 	// ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
							// ]),
							loader: useOwn('happypack/loader?id=happypack-typescript')
						},

						// CSS
						// This is bound to our server/client bundles as we only expect to be
						// serving the client bundle as a Single Page Application through the
						// server.
						ifElse(isClient || isServer)(

							Utils.mergeDeep(
								{
									test: /\.css$/,
								},

								// For development clients we will defer all our css processing to the
								// happypack plugin named "happypack-devclient-css".
								// See the respective plugin within the plugins section for full
								// details on what loader is being implemented.
								ifDevClient({
									loaders: [
										// 'happypack/loader?id=happypack-devclient-css',
										{
											loader: useOwn('happypack/loader'),
											query: 'id=happypack-devclient-css',
										},
									],
								}),

								// For a production client build we use the ExtractTextPlugin which
								// will extract our CSS into CSS files. We don't use happypack here
								// as there are some edge cases where it fails when used within
								// an ExtractTextPlugin instance.
								// Note: The ExtractTextPlugin needs to be registered within the
								// plugins section too.
								ifProdClient(() => ({
									loaders: [
										MiniCssExtractPlugin.loader,
										useOwn("css-loader")
									]
								})),

								// When targetting the server we use the "/locals" version of the
								// css loader, as we don't need any css files for the server.
								ifNode({
									loaders: [useOwn('css-loader/locals')],
								}),
							),
						),

						// ASSETS (Images/Fonts/etc)
						// This is bound to our server/client bundles as we only expect to be
						// serving the client bundle as a Single Page Application through the
						// server.
						ifElse(isClient || isServer)(() => ({
							loader: useOwn('file-loader'),
							exclude: [/\.ts$/, /\.js$/, /\.html$/, /\.json$/],
							query: {
								// What is the web path that the client bundle will be served from?
								// The same value has to be used for both the client and the
								// server bundles in order to ensure that SSR paths match the
								// paths used on the client.
								publicPath: isDev
									? // When running in dev mode the client bundle runs on a
									// seperate port so we need to put an absolute path here.
									`http://${config('host')}:${config('clientDevServerPort')}${config(
										'bundles.client.webPath',
									)}`
									: // Otherwise we just use the configured web path for the client.
									config('bundles.client.webPath'),
								// We only emit files when building a web bundle, for the server
								// bundle we only care about the file loader being able to create
								// the correct asset URLs.
								emitFile: isClient,
							},
						})),

						// Do not add any loader after file loader (fallback loader)
						// Make sure to add the new loader(s) before the "file" loader.
					]),
				},
			],
		},
	};



	return smp.wrap(webpackConfig);
};
