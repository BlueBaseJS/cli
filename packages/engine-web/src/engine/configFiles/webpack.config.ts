import * as webpack from 'webpack';
import { Engine } from '@blueeast/bluerain-cli-core';
// import { ifElse } from '../utils';

export type WebpackConfig = webpack.Configuration;

export type BuildOptions = {
	target: 'client' | 'server';
	mode: 'production' | 'development' | 'none' | string;
	engine: Engine;
};

// This plugin allows you to provide final adjustments your webpack
// configurations for each bundle before they get processed.
//
// I would recommend looking at the "webpack-merge" module to help you with
// merging modifications to each config.
export default (_webpackConfig: WebpackConfig, _buildOptions: BuildOptions): WebpackConfig => {

	// const { target, engine } = buildOptions;
	// const mode = engine.Configs.get('mode') || 'development';

	// const isProd = mode === 'production' ? true : false;
	// const isDev = !isProd;
	// const isClient = target === 'client';
	// const isServer = target === 'server';
	// const isNode = !isClient;

	// // Preconfigure some ifElse helper instnaces. See the util docs for more
	// // information on how this util works.
	// const ifDev = ifElse(isDev);
	// const ifProd = ifElse(isProd);
	// const ifNode = ifElse(isNode);
	// const ifClient = ifElse(isClient);
	// const ifDevClient = ifElse(isDev && isClient);
	// const ifProdClient = ifElse(isProd && isClient);

	const webpackConfig: WebpackConfig = {
		mode: 'production'
	};

	return webpackConfig;
};
