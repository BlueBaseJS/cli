import * as webpack from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import { WebpackTools } from '@blueeast/bluerain-cli-web';
import path from 'path';

const fromRoot = (pathSegment: string) => path.resolve(__dirname, `../../../${pathSegment}`);

export default
	(webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackTools.BuildOptions): webpack.Configuration => {
		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder

			// // Base Config
			// .use(WebpackTools.BaseConfig)

			// Manually set target to electron
			.merge({
				entry: fromRoot('./src/app/main_process.ts'),

				output: {
					filename: 'main.js',
					path: Utils.fromProjectRoot('/build/electron'),
					publicPath: 'build/',
				},

				target: 'electron-main',

				module: {

					// Use strict export presence so that a missing export becomes a compile error.
					strictExportPresence: true,

					noParse: [/aws\-sdk/],

					rules: [{
						oneOf: []
					}]
				}
			})

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
			.use(WebpackTools.LoaderTypescript)

			// JS Loader
			.use(WebpackTools.LoaderJavascript)

			// Finally, merge user input overrides
			.merge(webpackConfigInput)

			// Build
			.build();

		return configs;
	};
