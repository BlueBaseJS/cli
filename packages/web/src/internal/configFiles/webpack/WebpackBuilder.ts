import { Configuration as WebpackConfig } from 'webpack';
import { Engine, Utils } from '@blueeast/bluerain-cli-core';
import { PlatformConfigs, PlatformBundleConfig } from '../../../engine';
import path from 'path';
import merge from 'webpack-merge';
// import baseConfig from './baseConfig';

export type ConfigsBundle = PlatformConfigs & { publicAssetsPath: string };

export type ifCondition = (then: any, or?: any) => any;

export type Target = 'client' | 'server';
export type Mode = 'production' | 'development' | 'none';

export type WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder) => WebpackConfig;
// export type WebpackBuilderMiddleware = (options: { [key: string]: any }, builder: WebpackBuilder) => WebpackConfig;

export type BuildOptions = {
	bootPath: string;
	target: Target;
	mode: Mode;
	publicAssetsPath: string,
	engine: Engine;
};

export default class WebpackBuilder {

	/** Path of the boot options file (boot.js) */
	public bootPath: string;

	/** Build target */
	public target: Target;

	/** Build mode */
	public mode: Mode;
	public engine: Engine;

	////////////////////////////
	////// Configurations //////
	////////////////////////////

	/** All configurations */
	public configs: ConfigsBundle;

	public bundleConfig: PlatformBundleConfig;

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
		
		const { bootPath, target, mode, publicAssetsPath, engine } = buildOptions;
		const ifElse = Utils.ifElse;

		this.configs = {
			...(engine.Configs.toObject() as PlatformConfigs),
			publicAssetsPath,
		},

		// Init
		this.bootPath = bootPath;
		this.target = target;
		this.mode = mode;
		this.engine = engine;

		// Path helpers
		this.useOwn = (loaderStr: string) => path.resolve(__dirname, `../../../../node_modules/${loaderStr}`),
		this.fromRoot = (loaderStr: string) => path.resolve(__dirname, `../../../../${loaderStr}`),

		this.isProd = mode === 'production' ? true : false;
		this.isDev = !this.isProd;
		this.isClient = target === 'client';
		this.isServer = target === 'server';
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
		this.bundleConfig =
			this.isServer || this.isClient
				? // This is either our "server" or "client" bundle.
				this.configs.bundles[target]
				: // Otherwise it must be an additional node bundle.
				this.configs.additionalNodeBundles[target]

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