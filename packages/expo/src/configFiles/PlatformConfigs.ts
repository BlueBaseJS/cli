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

	/** The port on which to serve webpack dashboard on. */
	clientDevDashboardPort: number,

	/** Disable webpack dashboard? */
	disableDevDashboard: boolean,

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
   * node_modules are not included in any bundles that target "node" as a
   * runtime (e.g.. the server bundle) as including them often breaks builds
   * due to thinks like require statements containing expressions..
   * However. some of the modules contain files need to be processed by
   * one of our Webpack loaders (e.g. CSS). Add any file types to the list
   * below to allow them to be processed by Webpack.
	 */
	nodeExternalsFileTypeWhitelist: RegExp[],

	bundles: {
		client: PlatformBundleConfig,
	},
}
