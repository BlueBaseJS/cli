import * as webpack from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import { WebpackTools } from '@blueeast/bluerain-cli-web';
import path from 'path';
// const webpackRenderer = require('electron-webpack/webpack.renderer.config.js');
// import { getMainConfiguration } from 'electron-webpack';


const fromRoot = (pathSegment: string) => path.resolve(__dirname, `../../../${pathSegment}`);
const fromHere = (pathSegment: string) => path.resolve(__dirname, `${pathSegment}`);

export default
	async (webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackTools.BuildOptions): Promise<any> => {
		
		// const mainConfigs = await getMainConfiguration(process.env);

		// console.log('mainConfigs');
		// console.log('mainConfigs', mainConfigs);

		// if (mainConfigs) {
		// 	mainConfigs.entry = fromRoot('./src/main');
		// }

		// return mainConfigs;
		console.log('fromProjectRoot', Utils.fromProjectRoot(''))
	
		console.log('fromProjectRoot', Utils.fromProjectRoot('build/electron'))

		// const configs = webpackRenderer().then();
		
		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder

			// // Base Config
			.use(WebpackTools.BaseConfig)

			// Manually set target to electron
			.merge({

				mode: 'development',

				entry: fromHere('../../app/main_process.js'),

				output: {
					filename: 'main.js',
					path: Utils.fromProjectRoot('build/electron'),
					publicPath: 'build/',
				},

				target: 'electron-main',

				module: {

					// Use strict export presence so that a missing export becomes a compile error.
					strictExportPresence: true,

					// noParse: [/aws\-sdk/],

					rules: [{
						oneOf: []
					}]
				}
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
			.use(WebpackTools.LoaderTypescript)

			// JS Loader
			// .use(WebpackTools.LoaderJavascript)

			// Finally, merge user input overrides
			.merge(webpackConfigInput)

			// Build
			.build();

		return configs;
	};
