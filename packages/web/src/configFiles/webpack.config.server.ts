import * as WebpackTools from '../webpack';
import * as webpack from 'webpack';
import { WebpackHookArguments } from '../types/WebpackHookArguments';

export default
	(webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackHookArguments): webpack.Configuration => {

		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder
			// Base Config
			.use(WebpackTools.BaseConfig({
				env: {
					'ASSETS_DIR_PATH': JSON.stringify(buildOptions.assetsDirPath),
					'CLIENT_CONFIGS': JSON.stringify(buildOptions.clientConfigs),
					'SERVER_CONFIGS': JSON.stringify(buildOptions.clientConfigs),
				}
			}))

			// // Hot Module Replacement
			// .use(WebpackTools.HotModuleReplacement())

			// Source Maps
			.use(WebpackTools.SourceMaps())

			// Patch React Native
			.use(WebpackTools.ReactNative())

			// // Add Jarvis Dashboard
			// .use(WebpackTools.Jarvis())

			// // Generate assets.json
			// .use(WebpackTools.AssetsJson())

			// // Generate configs.json
			// .use(WebpackTools.ConfigsJson())

			///// Loaders

			// CSS Loader
			.use(WebpackTools.LoaderCss())

			// TS Loader
			.use(WebpackTools.LoaderTypescript())

			// JS Loader
			.use(WebpackTools.LoaderJavascript())

			// Finally, merge user input overrides
			.merge(webpackConfigInput)

			// Build
			.build();

		return configs;
	};
