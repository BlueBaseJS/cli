import * as webpack from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import { WebpackTools } from '@blueeast/bluerain-cli-web';
import path from 'path';

// const { spawn } = require('child_process');

// const fromRoot = (pathSegment: string) => path.resolve(__dirname, `../../../${pathSegment}`);
const fromHere = (pathSegment: string) => path.resolve(__dirname, `${pathSegment}`);

export default
	async (webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackTools.BuildOptions): Promise<any> => {

		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder

			// // Base Config
			.use(WebpackTools.BaseConfig)

			// Manually set target to electron
			.merge({

				mode: buildOptions.mode,

				entry: fromHere('../../app/renderer_process.js'),

				output: {
					filename: 'client.js',
					path: Utils.fromProjectRoot('build/electron'),
					publicPath: '/',
				},

				target: 'electron-renderer',

				// devServer: {
				// 	contentBase: Utils.fromProjectRoot('build/electron'),
				// 	stats: {
				// 		colors: true,
				// 		chunks: false,
				// 		children: false
				// 	},
				// 	before() {
				// 		spawn(
				// 			'electron',
				// 			['./build/electron/main.js'],
				// 			{ shell: true, env: process.env, stdio: 'inherit' }
				// 		)
				// 			.on('close', (_code: number) => process.exit(0))
				// 			.on('error', (spawnError: Error) => console.error(spawnError))
				// 	}
				// }

			} as any)

			// .use(WebpackTools.NodeExternals({
			// 	modulesDir: fromRoot('./node_modules'),
			// }))

			// // Hot Module Replacement
			// .use(WebpackTools.HotModuleReplacement)

			// Source Maps
			.use(WebpackTools.SourceMaps)

			// Patch React Native
			.use(WebpackTools.ReactNative)

			// // Add Jarvis Dashboard
			// .use(WebpackTools.Jarvis)


			.use(WebpackTools.ClientHTML)
			// .use(WebpackTools.CopyAssets)
			// .use(WebpackTools.CleanBuildDir)

			///// Loaders

			// CSS Loader
			.use(WebpackTools.LoaderCss)

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
