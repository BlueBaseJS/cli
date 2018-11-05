import * as WebpackTools from '../webpack';
import * as webpack from 'webpack';
import { WebpackHookArguments } from '../types';

export default
	(webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackHookArguments)
	: webpack.Configuration => {

		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder
			// Base Config
			.use(WebpackTools.BaseConfig())

			// Hot Module Replacement
			.use(WebpackTools.HotModuleReplacement())

			// Source Maps
			.use(WebpackTools.SourceMaps())

			// Patch React Native
			.use(WebpackTools.ReactNative())

			// Use Custom App.js feature
			.use(WebpackTools.CustomApp())

			// Add Jarvis Dashboard
			.use(WebpackTools.Jarvis())

			// Generate assets.json
			.use(WebpackTools.AssetsJson())

			// // Generate configs.json
			// .use(WebpackTools.ConfigsJson())

			// .use(WebpackTools.ClientHTML())

			///// Loaders

			// CSS Loader
			.use(WebpackTools.LoaderCss())

			// TS Loader
			.use(WebpackTools.LoaderTypescript())

			// // JS Loader
			// .use(WebpackTools.LoaderJavascript())

			// Finally, merge user input overrides
			.merge(webpackConfigInput)

			// Build
			.build();

		return configs;
	};
