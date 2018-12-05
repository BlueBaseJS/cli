/**
 * Defines settings for a webpack bundle. Used by WebpackBuilder
 */
export interface BundleDefinition {
	/**
	 * - "web" Compile for usage in a browser-like environment (default).
	 * - "webworker" Compile as WebWorker.
	 * - "node" Compile for usage in a node.js-like environment
	 * 		(use require to load chunks).
	 * - "async-node" Compile for usage in a node.js-like environment
	 * 		(use fs and vm to load chunks async).
	 * - "node-webkit" Compile for usage in webkit, uses jsonp chunk
	 * 		loading but also supports builtin node.js modules plus
	 * 		require(“nw.gui”) (experimental)
	 * - "atom" Compile for usage in electron (formerly known as atom-shell),
	 * 		supports require for modules necessary to run Electron.
	 * - "electron-renderer" Compile for Electron for renderer process,
	 * 		providing a target using JsonpTemplatePlugin, FunctionModulePlugin
	 * 		for browser
	 *   environments and NodeTargetPlugin and ExternalsPlugin for CommonJS
	 * 		and Electron built-in modules.
	 * - "electron-main" Compile for Electron for main process.
	 * - "atom" Alias for electron-main.
	 * - "electron" Alias for electron-main.
	 */
	target: 'web' | 'webworker' | 'node' | 'async-node' | 'node-webkit' |
	'atom' | 'electron' | 'electron-renderer' | 'electron-main';

	mode: 'production' | 'development',

	/** The path to source entry file for the bundle. */
	srcEntryFile: string,

	/** Path to files to transpile. */
	includePaths: string[],

	/** Where does the client bundle output live? */
	outputPath: string,

	/*
   * Do you want to included source maps for optimised builds of the client
   * bundle?
	 */
	includeSourceMapsForOptimisedBundle?: boolean,

  /** These extensions are tried when resolving src files for our bundles.. */
	extensions: string[],

	/*
   * node_modules are not included in any bundles that target "node" as a
   * runtime (e.g.. the server bundle) as including them often breaks builds
   * due to thinks like require statements containing expressions..
   * However. some of the modules contain files need to be processed by
   * one of our Webpack loaders (e.g. CSS). Add any file types to the list
   * below to allow them to be processed by Webpack.
	 */
	nodeExternalsFileTypeWhitelist: RegExp[],

}
