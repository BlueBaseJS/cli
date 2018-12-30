import * as webpack from 'webpack';
import { Utils } from '@bluebase/cli-core';
import { WebpackHookArguments } from '../types';
import { WebpackTools } from '@bluebase/cli-web';
import path from 'path';

const fromRoot = (pathSegment: string) => path.resolve(__dirname, `../../../${pathSegment}`);
const fromHere = (pathSegment: string) => path.resolve(__dirname, `${pathSegment}`);

export default
	async (webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackHookArguments): Promise<any> => {

		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder

			// // Base Config
			.use(WebpackTools.BaseConfig())

			// Manually set target to electron
			.merge({

				mode: buildOptions.configs.mode,

				entry: fromHere('../../app/main_process.js'),

				output: {
					filename: 'main.js',
					path: Utils.fromProjectRoot('build/electron'),
					publicPath: 'build/',
				},

				target: 'electron-main',

				// module: {

				// 	// Use strict export presence so that a missing export becomes a compile error.
				// 	strictExportPresence: true,

				// 	// noParse: [/aws\-sdk/],

				// 	rules: [{
				// 		oneOf: []
				// 	}]
				// }
			})

			.use(WebpackTools.NodeExternals({
				modulesDir: fromRoot('./node_modules'),
			}))

			// // Hot Module Replacement
			// .use(WebpackTools.HotModuleReplacement)

			// // Source Maps
			// .use(WebpackTools.SourceMaps)

			// // Patch React Native
			// .use(WebpackTools.ReactNative)

			// // Add Jarvis Dashboard
			// .use(WebpackTools.Jarvis)

			///// Loaders

			// // CSS Loader
			// .use(WebpackTools.LoaderCss)

			// TS Loader
			.use(WebpackTools.LoaderTypescript())

			// JS Loader
			// .use(WebpackTools.LoaderJavascript)

			// Finally, merge user input overrides
			.merge(webpackConfigInput)

			// Build
			.build();

		return configs;
	};
