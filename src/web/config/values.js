/**
 * Project Configuration.
 *
 * NOTE: All file/folder paths should be relative to the project root. The
 * absolute paths should be resolved during runtime by our build internal/server.
 */

const path = require('path');
const values = {


	// We use the polyfill.io service which provides the polyfills that a
	// client needs, which is far more optimal than the large output
	// generated by babel-polyfill.
	// Note: we have to keep this seperate from our "htmlPage" configuration
	// as the polyfill needs to be loaded BEFORE any of our other javascript
	// gets parsed.
	polyfillIO: {
		enabled: true,
		url: '//cdn.polyfill.io/v2/polyfill.min.js',
		// Reference https://qa.polyfill.io/v2/docs/features for a full list
		// of features.
		features: [
			// The default list.
			'default',
			'es6',
		],
	},


	// Path to the public assets that will be served off the root of the
	// HTTP server.
	publicAssetsPath: './public',

	// Where does our build output live?
	buildOutputPath: './web/build',

	// Do you want to included source maps for optimised builds of the client
	// bundle?
	includeSourceMapsForOptimisedClientBundle: false,

	// These extensions are tried when resolving src files for our bundles..
	bundleSrcTypes: ['web.js', 'js', 'jsx', 'json'],

	// What should we name the json output file that webpack generates
	// containing details of all output files for a bundle?
	bundleAssetsFileName: 'assets.json',

	// node_modules are not included in any bundles that target "node" as a
	// runtime (e.g.. the server bundle) as including them often breaks builds
	// due to thinks like require statements containing expressions..
	// However. some of the modules contain files need to be processed by
	// one of our Webpack loaders (e.g. CSS). Add any file types to the list
	// below to allow them to be processed by Webpack.
	nodeExternalsFileTypeWhitelist: [
		/\.(eot|woff|woff2|ttf|otf)$/,
		/\.(svg|png|jpg|jpeg|gif|ico)$/,
		/\.(mp4|mp3|ogg|swf|webp)$/,
		/\.(css|scss|sass|sss|less)$/,
	],

	// Note: you can only have a single service worker instance.  Our service
	// worker implementation is bound to the "client" and "server" bundles.
	// It includes the "client" bundle assets, as well as the public folder assets,
	// and it is served by the "server" bundle.
	serviceWorker: {
		// Enabled?
		enabled: true,
		// Service worker name
		fileName: 'sw.js',
		// Paths to the public assets which should be included within our
		// service worker. Relative to our public folder path, and accepts glob
		// syntax.
		includePublicAssets: [
			// NOTE: This will include ALL of our public folder assets.  We do
			// a glob pull of them and then map them to /foo paths as all the
			// public folder assets get served off the root of our application.
			// You may or may not want to be including these assets.  Feel free
			// to remove this or instead include only a very specific set of
			// assets.
			'./**/*',
		],
		// Offline page file name.
		offlinePageFileName: 'index.html',
	},

	bundles: {
		client: {
			// Src entry file.
			srcEntryFile: path.resolve(__dirname, '../../', 'boot.js'),

			// Src paths.
			srcPaths: [
				'./src',
				// './shared',
				// The service worker offline page generation needs access to the
				// config folder.  Don't worry we have guards within the config files
				// to ensure they never get included in a client bundle.
				'./config',
			],

			// Where does the client bundle output live?
			outputPath: './web/build',

			// What is the public http path at which we must serve the bundle from?
			webPath: '/',

			// Configuration settings for the development vendor DLL.  This will be created
			// by our development server and provides an improved dev experience
			// by decreasing the number of modules that webpack needs to process
			// for every rebuild of our client bundle.  It by default uses the
			// dependencies configured in package.json however you can customise
			// which of these dependencies are excluded, whilst also being able to
			// specify the inclusion of additional modules below.
			devVendorDLL: {
				// Enabled?
				enabled: true,

				// Specify any dependencies that you would like to include in the
				// Vendor DLL.
				//
				// NOTE: It is also possible that some modules require specific
				// webpack loaders in order to be processed (e.g. CSS/SASS etc).
				// For these cases you don't want to include them in the Vendor DLL.
				include: [
					// 'react-async-component',
					'react',
					'react-dom',
					'react-helmet',
					'react-router-dom',
				],

				// The name of the vendor DLL.
				name: '__dev_vendor_dll__',
			},
		},
	},


	// These plugin definitions provide you with advanced hooks into customising
	// the project without having to reach into the internals of the tools.
	//
	// We have decided to create this plugin approach so that you can come to
	// a centralised configuration folder to do most of your application
	// configuration adjustments.  Additionally it helps to make merging
	// from the origin starter kit a bit easier.
	plugins: {
		// This plugin allows you to provide final adjustments your babel
		// configurations for each bundle before they get processed.
		//
		// This function will be called once for each for your bundles.  It will be
		// provided the current webpack config, as well as the buildOptions which
		// detail which bundle and mode is being targetted for the current function run.
		babelConfig: (babelConfig, buildOptions) => {
			// eslint-disable-next-line no-unused-vars
			const { target, mode } = buildOptions;

			// Example
			/*
      if (target === 'server' && mode === 'development') {
        babelConfig.presets.push('foo');
      }
     */

			return babelConfig;
		},

		// This plugin allows you to provide final adjustments your webpack
		// configurations for each bundle before they get processed.
		//
		// I would recommend looking at the "webpack-merge" module to help you with
		// merging modifications to each config.
		//
		// This function will be called once for each for your bundles.  It will be
		// provided the current webpack config, as well as the buildOptions which
		// detail which bundle and mode is being targetted for the current function run.
		webpackConfig: (webpackConfig, buildOptions) => {
			// eslint-disable-next-line no-unused-vars
			const { target, mode } = buildOptions;


			return webpackConfig;
		},
	},
};


export default values;
