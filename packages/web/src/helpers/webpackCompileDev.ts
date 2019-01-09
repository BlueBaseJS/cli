import serve from 'webpack-serve';
import webpack from 'webpack';
import { Utils } from '@bluebase/cli-core';

/**
 * compiles a webpack config.
 * @param configs
 */
export const webpackCompileDev = async (configs: webpack.Configuration, label: string) => {

	return serve({}, {
		config: configs,

		devMiddleware: {
			publicPath: '/',
			writeToDisk: true,
		},

		on: {
			'build-started': () => {
				Utils.logger.log({
					label,
					level: 'info',
					message: 'Build Started',
				});
			},

			'build-finished': () => {
				Utils.logger.log({
					label,
					level: 'info',
					message: 'Running with latest changes.',
					notify: true,
				});
			},

			'compiler-error': () => {
				Utils.logger.log({
					label,
					level: 'error',
					message: 'Build failed, please check the console for more information.',
					notify: true,
				});
			},
		}


	});
};