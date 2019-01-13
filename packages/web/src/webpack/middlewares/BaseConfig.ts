// tslint:disable:object-literal-sort-keys
import { Configuration as WebpackConfig, EnvironmentPlugin, NoEmitOnErrorsPlugin } from 'webpack';
import { Utils } from '@bluebase/cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackBuilder from '../WebpackBuilder';
import merge from 'webpack-merge';
import { useOwn } from '../../helpers';

// tslint:disable-next-line:no-var-requires
const WebpackStylish = require('webpack-stylish');

const ifElse = Utils.ifElse;
const removeNil = Utils.removeNil;

export interface WebpackBuilderMiddlewareOpts {
	env?: { [key: string]: string };
}
/**
 * Base (default) webpack configs for bluebase projects
 * @param config
 * @param builder
 */
const BaseConfig: WebpackBuilderMiddleware =
	(options?: WebpackBuilderMiddlewareOpts) =>
		(config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

			const resolve = !builder.configs.extensions ? {} :
				{ extensions: builder.configs.extensions.map((ext: string) => `.${ext}`) };

			const env = options && options.env ? options.env : {};

			return merge(config, {

				// Mode
				mode: builder.configs.mode,

				target: builder.configs.target || (builder.isClient
					? // Only our client bundle will target the web as a runtime.
					'web'
					: // Any other bundle must be targetting node as a runtime.
					'node'),

				// Ensure that webpack polyfills the following node features for use
				// within any bundles that are targetting node as a runtime. This will be
				// ignored otherwise.
				node: {
					__dirname: true,
					__filename: true,
				},

				// Define our entry chunks for our bundle.
				entry: {

					// We name our entry files "index" as it makes it easier for us to
					// import bundle output files (e.g. `import server from './build/server';`)
					index: [
						// The source entry file for the bundle.
						builder.configs.srcEntryFile,
					],
				},

				// Bundle output configuration.
				output: {

					// The dir in which our bundle should be output.
					path: builder.configs.outputPath,

					// The filename format for our bundle's entries.
					filename: builder.ifProdClient(

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
					libraryTarget: builder.ifNode('commonjs2', 'var'),

					pathinfo: true,

					// This is the web path under which our webpack bundled client should
					// be considered as being served from.
					publicPath: builder.configs.publicPath,
					// publicPath: builder.ifDev(

					// 	// As we run a seperate development server for our client and server
					// 	// bundles we need to use an absolute http path for the public path.
					// 	`http://${builder.configs.host}:${builder.configs.devServerPort}${builder.configs.publicPath}`,

					// 	// Otherwise we expect our bundled client to be served from this path.
					// 	builder.configs.publicPath,
					// ),
				},

				// Performance budget feature.
				// This enables checking of the output bundle size, which will result in
				// warnings/errors if the bundle sizes are too large.
				// We only want this enabled for our production client.  Please
				// see the webpack docs on how you can configure this to your own needs:
				// https://webpack.js.org/configuration/performance/
				performance: builder.ifProdClient(
					// Enable webpack's performance hints for production client builds.
					{ hints: 'warning' },
					// Else we have to set a value of "false" if we don't want the feature.
					false,
				),

				resolve: {

					...resolve,

					// These extensions are tried when resolving a file.
					extensions: builder.configs.extensions.map((ext: string) => `.${ext}`),

					// modules: [useOwn(), 'node_modules'],

					alias: {
						'@bluebase/core': Utils.fromProjectRoot('node_modules/@bluebase/core'),

						// BlueBase boot options file, AKA bluebase.js
						BLUEBASE_BOOT_OPTIONS: builder.bluebaseJsPath,

						// Custom App.js
						APP_JS: builder.appJsPath,
					},
				},


				// Webpack 4 automatically runs UglifyPlugin and other optimization processes.
				// It can be configured here:
				optimization: {
					minimizer: builder.ifProdClient([
						new UglifyJsPlugin({

							// Enable file caching
							cache: true,

							// Use multi-process parallel running to improve the build speed
							// Default number of concurrent runs: os.cpus().length - 1
							parallel: true,

							sourceMap: builder.configs.includeSourceMapsForOptimisedClientBundle,

							uglifyOptions: {

								compress: {
									// Disabled because of an issue with Uglify breaking seemingly valid code:
									// https://github.com/facebook/create-react-app/issues/2376
									// Pending further investigation:
									// https://github.com/mishoo/UglifyJS2/issues/2011
									comparisons: false,
									warnings: false,
								},

								ecma: 8,

								mangle: {
									safari10: true,
								},

								output: {
									// Turned on because emoji and regex is not minified properly using default
									// https://github.com/facebook/create-react-app/issues/2488
									ascii_only: true,
									comments: false,
								},
							},
						}),
						// new OptimizeCSSAssetsPlugin({})
					]),

					// // Automatically split vendor and commons
					// // https://twitter.com/wSokra/status/969633336732905474
					// // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
					// splitChunks: {
					// 	chunks: 'all',
					// 	name: 'vendors',
					// },
					// // Keep the runtime chunk seperated to enable long term caching
					// // https://twitter.com/wSokra/status/969679223278505985
					// runtimeChunk: true,
				},

				plugins: removeNil([

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
					new EnvironmentPlugin({

						...env,

						// Is this the "client" bundle?
						BUILD_FLAG_IS_CLIENT: JSON.stringify(builder.isClient),
						// Is this a development build?
						BUILD_FLAG_IS_DEV: JSON.stringify(builder.isDev),
						// Is this a node bundle?
						BUILD_FLAG_IS_NODE: JSON.stringify(builder.isNode),
						// Is this the "server" bundle?
						BUILD_FLAG_IS_SERVER: JSON.stringify(builder.isServer),
						// // Is SSR mode active?
						// BUILD_FLAG_IS_SSR: JSON.stringify(builder.isServer && !builder.configs.disableSSR),
						// It is really important to use NODE_ENV=production in order to use
						// optimised versions of some node_modules, such as React.
						NODE_ENV: builder.isProd ? 'production' : 'development',

						// SERVER_CONFIGS: ifNode(() => JSON.stringify(configs))
					}),

					// We don't want webpack errors to occur during development as it will
					// kill our dev servers.
					builder.ifDev(() => new NoEmitOnErrorsPlugin()),

					// Stylish build output on console
					builder.ifDev(() => new WebpackStylish()),
				]),

				module: {

					// Use strict export presence so that a missing export becomes a compile error.
					strictExportPresence: true,

					rules: [{
						oneOf: [

							// ASSETS (Images/Fonts/etc)
							// This is bound to our server/client bundles as we only expect to be
							// serving the client bundle as a Single Page Application through the
							// server.
							ifElse(builder.isClient || builder.isServer)(() => {
								return {
									loader: useOwn('file-loader'),
									exclude: [/\.ts$/, /\.js$/, /\.html$/, /\.json$/],
									query: {

										// What is the web path that the client bundle will be served from?
										// The same value has to be used for both the client and the
										// server bundles in order to ensure that SSR paths match the
										// paths used on the client.
										publicPath:
											// builder.isDev
											// ? // When running in dev mode the client bundle runs on a
											// // seperate port so we need to put an absolute path here.
											// // tslint:disable-next-line:max-line-length
											// tslint:disable-next-line:max-line-length
											// `http://${builder.configs.host}:${builder.configs.clientDevServerPort}${builder.configs.bundles.client.webPath}`
											// : // Otherwise we just use the configured web path for the client.
											builder.configs.publicPath,

										// We only emit files when building a web bundle, for the server
										// bundle we only care about the file loader being able to create
										// the correct asset URLs.
										emitFile: builder.isClient,
									},
								};
							}),

							// Do not add any loader after file loader (fallback loader)
							// Make sure to add the new loader(s) before the "file" loader.

						]
					}],
				},
			});
		};

export default BaseConfig;