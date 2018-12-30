import * as webpack from 'webpack';
import { WebpackHookArguments } from '../types';
import { WebpackTools } from '@bluebase/cli-web';

export default
	async (webpackConfigInput: webpack.Configuration = {}, buildOptions: WebpackHookArguments): Promise<any> => {

		const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
		const configs = builder

			// // Base Config
			.use(WebpackTools.BaseConfig())

			// // Manually set target to electron
			// .merge({

			// 	// devServer: {
			// 	// 	contentBase: Utils.fromProjectRoot('build/electron'),
			// 	// 	stats: {
			// 	// 		colors: true,
			// 	// 		chunks: false,
			// 	// 		children: false
			// 	// 	},
			// 	// 	before() {
			// 	// 		spawn(
			// 	// 			'electron',
			// 	// 			['./build/electron/main.js'],
			// 	// 			{ shell: true, env: process.env, stdio: 'inherit' }
			// 	// 		)
			// 	// 			.on('close', (_code: number) => process.exit(0))
			// 	// 			.on('error', (spawnError: Error) => console.error(spawnError))
			// 	// 	}
			// 	// }

			// } as any)

			// .use(WebpackTools.NodeExternals({
			// 	modulesDir: fromRoot('./node_modules'),
			// }))

			// // Hot Module Replacement
			// .use(WebpackTools.HotModuleReplacement)

			// Source Maps
			.use(WebpackTools.SourceMaps())

			// Patch React Native
			.use(WebpackTools.ReactNative())

			// // Add Jarvis Dashboard
			// .use(WebpackTools.Jarvis)


			.use(WebpackTools.ClientHTML())
			// .use(WebpackTools.CleanBuildDir)
			// .use(WebpackTools.CopyAssets)

			///// Loaders

			// CSS Loader
			.use(WebpackTools.LoaderCss())

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
