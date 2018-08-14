import * as webpack from 'webpack';
import { Engine } from '@blueeast/bluerain-cli-core';
import { PlatformConfigs } from '../../../engine';
import webBuilder from './web';

export type WebpackConfig = webpack.Configuration;
export type ConfigsBundle = PlatformConfigs & { publicAssetsPath: string };

export type BuildOptions = {
	bootPath: string;
	target: 'client' | 'server';
	mode: 'production' | 'development' | 'none';
	publicAssetsPath: string,
	engine: Engine;
};

// This plugin allows you to provide final adjustments your webpack
// configurations for each bundle before they get processed.
//
// I would recommend looking at the "webpack-merge" module to help you with
// merging modifications to each config.
export default (webpackConfigInput: WebpackConfig, buildOptions: BuildOptions): WebpackConfig => {

	console.log('new webpacl')
	return webBuilder(webpackConfigInput, buildOptions);

};
