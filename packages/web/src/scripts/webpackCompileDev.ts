import serve from 'webpack-serve';
import webpack from 'webpack';

/**
 * compiles a webpack config.
 * @param configs
 */
export const webpackCompileDev = async (configs: webpack.Configuration) => {

	return serve({}, {
		config: configs,
		// content: Utils.fromProjectRoot('./build/electron'),
		devMiddleware: {
			publicPath: '/',
			writeToDisk: true,

		},

		hotClient: false,

		// add: (app, _middleware, options) => {
		// 	// Be sure to pass the options argument from the arguments
		// 	app.use(webpackServeWaitpage(options, { theme: 'material' }));

		// 	// Make sure the usage of webpack-serve-waitpage will be before the following commands if exists
		// 	// middleware.webpack();
		// 	// middleware.content();
		// },

		// on: {
		// 	'build-started': () => {
		// 		Utils.logger.info('Electronnnnnn...');
		// 		spawn(
		// 			fromRoot('./node_modules/.bin/electron'),
		// 			['./build/electron/main.js'],
		// 			{ shell: true, env: process.env, stdio: 'inherit' }
		// 		)
		// 			.on('close', (_code: number) => process.exit(0))
		// 			.on('error', (spawnError: Error) => console.error(spawnError));
		// 	}
		// }
	});
};