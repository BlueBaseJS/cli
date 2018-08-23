import { Configuration as WebpackConfig } from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import { WebpackConfigs } from './WebpackConfigs';
import { Utils } from '@blueeast/bluerain-cli-core';

export type ifCondition = (then: any, or?: any) => any;

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
export type Target = 'web' | 'webworker' | 'node' | 'async-node' | 'node-webkit' | 'atom' | 'electron' | 'electron-renderer' | 'electron-main' | ((compiler?: any) => void);

export type Mode = 'production' | 'development';

export type WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder) => WebpackConfig;
// export type WebpackBuilderMiddleware = (options: { [key: string]: any }, builder: WebpackBuilder) => WebpackConfig;

export type BuildOptions = {
	
	/** Path of the directory that has configuration files (including bluerain.js) */
	configDir: string,
	
	/** Path of the directory that the output be generated in */
	buildDir: string,

	/** Path of the direcotry that has all the public assets */
	assetsDir: string,
	
	/** Path of the bluerain.js file */
	bluerainJsPath: string;
	
	/** Webpack build target */
	target: Target;

	/** Webpack build mode */
	mode: Mode;

	/** Platform configs */
	configs: { [key: string]: any };
};

export default class WebpackBuilder {

	/** Path of the boot options file (boot.js) */
	public bluerainJsPath: string;

	public assetsDir: string;
	public buildDir: string;
	public configDir: string;
	
	////////////////////////////
	////// Configurations //////
	////////////////////////////

	/** Build target */
	public target: Target;

	/** Build mode */
	public mode: Mode;

	public configs: { [key: string]: any };
	public bundleConfig: WebpackConfigs;

	///////////////////////////
	////// Path Builders //////
	///////////////////////////

	/** Get absolute path of the node_module of this project */
	public useOwn = (pathSegment: string) => path.resolve(__dirname, `../../../node_modules/${pathSegment}`);

	/** Get absolute path of the given segment relatively from the root of this project */
	public fromRoot = (pathSegment: string) => path.resolve(__dirname, `../../../${pathSegment}`);

	///////////////////////
	////// Constants //////
	///////////////////////

	/** Is this production enviornment? */
	public isProd: boolean;

	/** Is this development enviornment? */
	public isDev: boolean;

	/** Is this a client build? */
	public isClient: boolean;

	/** Is this a server build? */
	public isServer: boolean;

	/** Is this a node enviornment? */
	public isNode: boolean;

	//////////////////////////
	////// Conditionals //////
	//////////////////////////

	// Preconfigure some ifElse helper instnaces. See the util docs for more
	// information on how this util works.

	/** Execute if enviornment is development. */
	public ifDev: ifCondition;

	/** Execute if enviornment is production. */
	public ifProd: ifCondition;

	/** Execute if enviornment is node. */
	public ifNode: ifCondition;

	/** Execute if enviornment is client. */
	public ifClient: ifCondition;

	/** Execute if enviornment is development client. */
	public ifDevClient: ifCondition;

	/** Execute if enviornment is production client. */
	public ifProdClient: ifCondition;

	constructor(buildOptions: BuildOptions, private webpackConfig: WebpackConfig = {}) {
		
		const { assetsDir, buildDir, configDir, configs, bluerainJsPath, target, mode } = buildOptions;
		const ifElse = Utils.ifElse;

		// Init
		this.assetsDir = assetsDir;
		this.bluerainJsPath = bluerainJsPath;
		this.buildDir = buildDir;
		this.configs = configs;
		this.configDir = configDir;
		this.mode = mode || Utils.isProduction() ? 'production' : 'development';
		this.target = target;

		// Path helpers
		this.isProd = mode === 'production' ? true : false;
		this.isDev = !this.isProd;
		this.isClient = target !== 'node';
		this.isServer = !this.isClient;
		this.isNode = !this.isClient;
		// this.isElectron = this.configs.target === 'electron';

		// Conditionals
		this.ifDev = ifElse(this.isDev);
		this.ifProd = ifElse(this.isProd);
		this.ifNode = ifElse(this.isNode);
		this.ifClient = ifElse(this.isClient);
		this.ifDevClient = ifElse(this.isDev && this.isClient);
		this.ifProdClient = ifElse(this.isProd && this.isClient);

		// Extract configs of this bundle
		this.bundleConfig = this.configs.webpack;

		if (!this.bundleConfig) {
			throw Error(`No bundle configuration exists for target: ${target}`);
		}
	}

	/**
	 * Build a webpack config
	 * @param webpackConfigInput 
	 */
	public build(): WebpackConfig {
		return this.webpackConfig;
	}

	/**
	 * Use a middleware. A middleware is a function that returns a merged
	 * webpack config
	 * @param middleware 
	 */
	public use(middleware: WebpackBuilderMiddleware): WebpackBuilder {

		this.webpackConfig = middleware(this.webpackConfig, this)
		return this;
	}

	/**
	 * Merge a webpack config
	 * @param config 
	 */
	public merge(config: WebpackConfig): WebpackBuilder {

		this.webpackConfig = merge(this.webpackConfig, config);
		return this;
	}
}