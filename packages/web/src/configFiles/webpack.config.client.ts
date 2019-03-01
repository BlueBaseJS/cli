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

			// favIcon plugin
			.use(WebpackTools.FavIcon())

			// Hot Module Replacement
			.use(WebpackTools.HotModuleReplacement())

			// Source Maps
			.use(WebpackTools.SourceMaps())

			// Patch React Native
			.use(WebpackTools.ReactNative())

			// Generate assets.json
			.use(WebpackTools.AssetsJson())

			///// Loaders

			// CSS Loader
			.use(WebpackTools.LoaderCss())

			// TS Loader
			.use(WebpackTools.LoaderTypescript())

			// Finally, merge user input overrides
			.merge(webpackConfigInput);

		if (buildOptions.static === true) {
			configs.use(WebpackTools.ClientHTML());
		}

		if (buildOptions.configs.devDashboardEnable === true) {
			configs.use(WebpackTools.Jarvis(buildOptions.configs.devDashboardPort));
		}

		return configs.build();
	};
