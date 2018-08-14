import * as webpack from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import WebpackBuilder, { BuildOptions } from './WebpackBuilder';
import { BaseConfig, HotModuleReplacement, SourceMaps, ReactNative, Jarvis, AssetsJson, ConfigsJson, LoaderCss, LoaderJavascript, LoaderTypescript } from './middlewares';

const logger = Utils.logger;

export default (webpackConfigInput: webpack.Configuration = {}, buildOptions: BuildOptions): webpack.Configuration => {
	const builder = new WebpackBuilder(buildOptions, webpackConfigInput);
	const configs = builder
		// Base Config
		.use(BaseConfig)

		// Hot Module Replacement
		.use(HotModuleReplacement)

		// Source Maps
		.use(SourceMaps)

		// Patch React Native
		.use(ReactNative)

		// Add Jarvis Dashboard
		.use(Jarvis)

		// Generate assets.json
		.use(AssetsJson)

		// Generate configs.json
		.use(ConfigsJson)

		///// Loaders

		// CSS Loader
		.use(LoaderCss)

		// TS Loader
		.use(LoaderTypescript)

		// JS Loader
		.use(LoaderJavascript)

		// Finally, merge user input overrides
		.merge(webpackConfigInput)

		// Build
		.build();
		
	return configs;
}
