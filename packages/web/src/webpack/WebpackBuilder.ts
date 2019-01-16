// tslint:disable:max-line-length
import { BuilderConfigsProp, BuilderOptions, WebpackBuilderMiddlewareFn } from '../types';
import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@bluebase/cli-core';
import merge from 'webpack-merge';

export type ifCondition = (then: any, or?: any) => any;

export default class WebpackBuilder {

	/** Path of the boot options file (boot.js) */
	public bluebaseJsPath: string;

	public appJsPath: string;
	public assetsDir: string;
	public buildDir: string;
	public configDir: string;

	////////////////////////////
	////// Configurations //////
	////////////////////////////

	public configs: BuilderConfigsProp;

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

	///////////////////////////
	////// Path Builders //////
	///////////////////////////

	constructor(buildOptions: BuilderOptions, private webpackConfig: WebpackConfig = {}) {

		const { appJsPath, assetsDir, buildDir, configDir, configs, bluebaseJsPath } = buildOptions;

		if (!configs) {
			throw Error(`No bundle configuration given to WebpackBuilder.`);
		}

		this.configs = { ...configs };
		const isProd = Utils.isProduction() ? 'production' : 'development';
		this.configs.mode = configs.mode || isProd;
		this.configs.target = configs.target || 'web';

		const ifElse = Utils.ifElse;

		// Init
		this.appJsPath = appJsPath;
		this.assetsDir = assetsDir;
		this.bluebaseJsPath = bluebaseJsPath;
		this.buildDir = buildDir;
		this.configs = configs;
		this.configDir = configDir;

		// Path helpers
		this.isProd = this.configs.mode === 'production' ? true : false;
		this.isDev = !this.isProd;
		this.isClient = this.configs.target !== 'node';
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
	public use(middleware: WebpackBuilderMiddlewareFn): WebpackBuilder {

		this.webpackConfig = middleware(this.webpackConfig, this);
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