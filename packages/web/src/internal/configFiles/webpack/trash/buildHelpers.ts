import { Engine, Utils } from '@blueeast/bluerain-cli-core';
import { PlatformConfigs } from '../../../../engine';
import path from 'path';

export type ConfigsBundle = PlatformConfigs & { publicAssetsPath: string };

export type BuildOptions = {
	bootPath: string;
	target: 'client' | 'server';
	mode: 'production' | 'development' | 'none';
	publicAssetsPath: string,
	engine: Engine;
};

export type ifCondition = (then: any, or?: any) => any;

export type Helpers = {
	
	/** All configurations */
	configs: ConfigsBundle,

	// Paths
	/** Get absolute path of the node_module of this project */
	useOwn: (pathSegment: string) => string,

	/** Get absolute path of the given segment relatively from the root of this project */
	fromRoot: (pathSegment: string) => string,

	// Constants

	/** Is this production enviornment? */
	isProd: boolean,

	/** Is this development enviornment? */
	isDev: boolean,

	/** Is this a client build? */
	isClient: boolean,

	/** Is this a server build? */
	isServer: boolean,

	/** Is this a node enviornment? */
	isNode: boolean,

	// Conditionals
	/** Execute if enviornment is development. */
	ifDev: ifCondition,

	/** Execute if enviornment is production. */
	ifProd: ifCondition,

	/** Execute if enviornment is node. */
	ifNode: ifCondition,

	/** Execute if enviornment is client. */
	ifClient: ifCondition,

	/** Execute if enviornment is development client. */
	ifDevClient: ifCondition,

	/** Execute if enviornment is production client. */
	ifProdClient: ifCondition,
}

export default (buildOptions: BuildOptions): Helpers => {

	const { target, mode, publicAssetsPath, engine } = buildOptions;
	const ifElse = Utils.ifElse;

	const helpers: any = {

		configs: {
			...engine.Configs.toObject(),
			publicAssetsPath,
		},

		// Path helpers
		useOwn: (loaderStr: string) => path.resolve(__dirname, `../../../node_modules/${loaderStr}`),
		fromRoot: (loaderStr: string) => path.resolve(__dirname, `../../../${loaderStr}`),
	}

	helpers.isProd = mode === 'production' ? true : false;
	helpers.isDev = !helpers.isProd;
	helpers.isClient = target === 'client';
	helpers.isServer = target === 'server';
	helpers.isNode = !helpers.isClient;

	// Preconfigure some ifElse helper instnaces. See the util docs for more
	// information on how this util works.
	helpers.ifDev = ifElse(helpers.isDev);
	helpers.ifProd = ifElse(helpers.isProd);
	helpers.ifNode = ifElse(helpers.isNode);
	helpers.ifClient = ifElse(helpers.isClient);
	helpers.ifDevClient = ifElse(helpers.isDev && helpers.isClient);
	helpers.ifProdClient = ifElse(helpers.isProd && helpers.isClient);

	return helpers as Helpers;
}