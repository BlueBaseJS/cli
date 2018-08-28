import { HotDevelopmentOptions } from '.';
import { Utils } from '@blueeast/bluerain-cli-core';
import ListenerManager from './listenerManager';
import serve from 'webpack-serve';

export class HotClientServer {

	private app?: serve.InitializedKoa;
	private listenerManager?: ListenerManager;

	constructor(public configs: HotDevelopmentOptions) {}

	public async start() {

		const result = await serve({}, {
			compiler: this.configs.clientCompiler,

			// content: Utils.fromProjectRoot('./build/electron'),
			devMiddleware: {
				publicPath: '/',
				writeToDisk: true,
			},

			// add: (app, _middleware, options) => {
			// 	// Be sure to pass the options argument from the arguments
			// 	app.use(webpackServeWaitpage(options, { theme: 'material' }));

			// 	// Make sure the usage of webpack-serve-waitpage will be before the following commands if exists
			// 	// middleware.webpack();
			// 	// middleware.content();
			// },

			on: {
				'build-started': () => {
					Utils.logger.log({
						label: '@bluerain/cli/client',
						level: 'info',
						message: 'Build Started',
					});
				},

				'build-finished': () => {
					Utils.logger.log({
						label: '@bluerain/cli/client',
						level: 'info',
						message: 'Running with latest changes.',
						notify: true,
					});
				},

				'compiler-error': () => {
					Utils.logger.log({
						label: '@bluerain/cli/client',
						level: 'error',
						message: 'Build failed, please check the console for more information.',
						notify: true,
					});
				},
			}
		});

		this.app = result.app;

		this.listenerManager = new ListenerManager(this.app, 'client');

		result.app.on('connection', () => {
			// tslint:disable-next-line:no-console
			console.log('connected');
		});
	}

	public async dispose() {
		if (this.app) {
			this.app.stop();
		}

		if (this.listenerManager) {
			await this.listenerManager.dispose();
		}
	}
}