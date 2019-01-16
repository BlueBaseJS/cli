import * as WebpackTools from '../webpack';
import * as webpack from 'webpack';
import { WebpackHookArguments } from '../types/WebpackHookArguments';
import { PathsBundle } from '../types';

export default
	(webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackHookArguments): webpack.Configuration => {

    const paths: PathsBundle = {
      appJsPath: buildOptions.appJsPath,
			assetsDir: buildOptions.assetsDir,
			bluebaseJsPath: buildOptions.bluebaseJsPath,
      buildDir: buildOptions.buildDir,
			clientConfigPath: buildOptions.clientConfigPath,
			clientWebpackConfigPath: buildOptions.clientWebpackConfigPath,
      configDir: buildOptions.configDir,
			serverConfigPath: buildOptions.serverConfigPath,
			serverWebpackConfigPath: buildOptions.serverWebpackConfigPath,
      static: buildOptions.static,
    };

		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder
			// Base Config
			.use(WebpackTools.BaseConfig({
				// env: {
				// 	'ASSETS_DIR_PATH': JSON.stringify(assetsDirPath),
				// 	'CLIENT_CONFIGS': JSON.stringify(buildOptions.clientConfigs),
				// 	'SERVER_CONFIGS': JSON.stringify(buildOptions.clientConfigs),
				// }
			}))

			// // Hot Module Replacement
			// .use(WebpackTools.HotModuleReplacement())

			// Source Maps
			.use(WebpackTools.SourceMaps())

			// Patch React Native
			.use(WebpackTools.ReactNative())

			.use(WebpackTools.NodeExternals())

			// // Add Jarvis Dashboard
			// .use(WebpackTools.Jarvis())

			// // Generate assets.json
			// .use(WebpackTools.AssetsJson())

			// Generate configs.json
			.use(WebpackTools.WriteJson({
				filename: 'paths.json',
				object: paths,
				pretty: true // makes file human-readable (default false)
			}))

			///// Loaders

			// CSS Loader
			.use(WebpackTools.LoaderCss())

			// TS Loader
			.use(WebpackTools.LoaderTypescript())

			// // JS Loader
			// .use(WebpackTools.LoaderJavascript())

      .merge({
        resolve: {
          alias: {
            'CLIENT_CONFIG': buildOptions.clientConfigPath,
            'SERVER_CONFIG': buildOptions.serverConfigPath,
          }
        }
      })

      // Finally, merge user input overrides
      .merge(webpackConfigInput)

			// Build
			.build();

		return configs;
	};