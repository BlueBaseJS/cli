import { IHelmetContentSecurityPolicyDirectives } from 'helmet';

export interface NodeBundle {
	srcEntryFile: string,
	srcPaths: string[],
	outputPath: string,
}

export interface PlatformBundleConfig {
	/** Src entry file. */
	srcEntryFile: string,

	/** Src paths. */
	srcPaths: string[],

	/** Where does the client bundle output live? */
	outputPath: string,

	/** What is the public http path at which we must serve the bundle from? */
	webPath?: string,

	/*
	 * Configuration settings for the development vendor DLL.  This will be created
	 * by our development server and provides an improved dev experience
	 * by decreasing the number of modules that webpack needs to process
	 * for every rebuild of our client bundle.  It by default uses the
	 * dependencies configured in package.json however you can customise
	 * which of these dependencies are excluded, whilst also being able to
	 * specify the inclusion of additional modules below.
	 */
	devVendorDLL?: {
		/** Enabled? */
		enabled: boolean,

		/*
		 * Specify any dependencies that you would like to include in the
		 * Vendor DLL.
		//
		 * NOTE: It is also possible that some modules require specific
		 * webpack loaders in order to be processed (e.g. CSS/SASS etc).
		 * For these cases you don't want to include them in the Vendor DLL.
		 */
		include: string[],

		/** The name of the vendor DLL. */
		name: string,
	},
}

export interface PlatformConfigs {

	/**
	 * - "web" Compile for usage in a browser-like environment (default).
	 * - "webworker" Compile as WebWorker.
	 * - "node" Compile for usage in a node.js-like environment (use require to load chunks).
	 * - "async-node" Compile for usage in a node.js-like environment (use fs and vm to load chunks async).
	 * - "node-webkit" Compile for usage in webkit, uses jsonp chunk loading but also supports builtin node.js modules plus require(“nw.gui”) (experimental)
	 * - "atom" Compile for usage in electron (formerly known as atom-shell), supports require for modules necessary to run Electron.
	 * - "electron-renderer" Compile for Electron for renderer process, providing a target using JsonpTemplatePlugin, FunctionModulePlugin for browser
	 *   environments and NodeTargetPlugin and ExternalsPlugin for CommonJS and Electron built-in modules.
	 * - "electron-main" Compile for Electron for main process.
	 * - "atom" Alias for electron-main.
	 * - "electron" Alias for electron-main.
	 */
	target?: 'web' | 'webworker' | 'node' | 'async-node' | 'node-webkit' | 'atom' | 'electron' | 'electron-renderer' | 'electron-main';

	/** The host on which the server should run. */
	host: string,

	/** The port on which the server should run. */
	port: number,

	/** The port on which the client bundle development server should run. */
	clientDevServerPort: number,

	/** The port on which to serve webpack dashboard on. */
	clientDevDashboardPort: number,

	/** Disable webpack dashboard? */
	disableDevDashboard: boolean,

	/*
	 * This is an example environment variable which is used within the react
	 * application to demonstrate the usage of environment variables across
	 * the client and server bundles.
	 */
	welcomeMessage: string,

	/** Disable server side rendering? */
	disableSSR: boolean,

	/*
	 * How long should we set the browser cache for the served assets?
	 * Don't worry, we add hashes to the files, so if they change the new files
	 * will be served to browsers.
	 * We are using the "ms" format to set the length.
	 * @see https://www.npmjs.com/package/ms
	 */
	browserCacheMaxAge: string,

	/*
	 * Basic configuration for the HTML page that hosts our application.
   * We make use of react-helmet to consume the values below.
   * @see https://github.com/nfl/react-helmet
	 */
	htmlPage: {
		titleTemplate: string,
		defaultTitle: string,
		description: string,
	},

	/*
   * Content Security Policy (CSP)
   * @see server/middleware/security for more info.
	 */
	cspExtensions: IHelmetContentSecurityPolicyDirectives,

  /** Where does our build output live? */
	buildOutputPath: string,

	/*
   * Do you want to included source maps for optimised builds of the client
   * bundle?
	 */
	includeSourceMapsForOptimisedClientBundle: boolean,

  /** These extensions are tried when resolving src files for our bundles.. */
	bundleSrcTypes: string[],

	/*
   * What should we name the json output file that webpack generates
   * containing details of all output files for a bundle?
	 */
	bundleAssetsFileName: string,

	/*
   * node_modules are not included in any bundles that target "node" as a
   * runtime (e.g.. the server bundle) as including them often breaks builds
   * due to thinks like require statements containing expressions..
   * However. some of the modules contain files need to be processed by
   * one of our Webpack loaders (e.g. CSS). Add any file types to the list
   * below to allow them to be processed by Webpack.
	 */
	nodeExternalsFileTypeWhitelist: RegExp[],

	/*
   * Note: you can only have a single service worker instance.  Our service
   * worker implementation is bound to the "client" and "server" bundles.
   * It includes the "client" bundle assets, as well as the public folder assets,
   * and it is served by the "server" bundle.
	 */
	serviceWorker: {

		/** Enabled? */
		enabled: boolean,

		/** Service worker name */
		fileName: string,

		/*
     * Paths to the public assets which should be included within our
     * service worker. Relative to our public folder path, and accepts glob
     * syntax.
		 */
		includePublicAssets: string[],

    /** Offline page file name. */
		offlinePageFileName: string,
	},

	bundles: {
		client: PlatformBundleConfig,
		server: PlatformBundleConfig,
	},

	/*
	 * The webpack configuration and build scripts have been built so
	 * that you can add arbitrary additional node bundle configurations here.
	 *
	 * A common requirement for larger projects is to add additional "node"
	 * target bundles (e.g an APi server endpoint). Therefore flexibility has been
	 * baked into our webpack config factory to allow for this.
	 *
	 * Simply define additional configurations similar to below.  The development
	 * server will manage starting them up for you.  The only requirement is that
	 * within the entry for each bundle you create and return the "express"
	 * listener.
	 */
	additionalNodeBundles: {
		[key: string]: NodeBundle
	},
}
