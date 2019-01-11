import serve from 'webpack-serve';
import { Utils } from '@bluebase/cli-core';
import deepmerge from 'deepmerge';

/**
 * compiles a webpack config.
 * @param configs
 */
export const webpackCompileDev = async (configs: serve.Options, label: string) => {

	const defaultConfigs = {
		// open: true,

		devMiddleware: {
			publicPath: '/',
			writeToDisk: true,
		},

		on: {

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
	};

	const mergedConfigs = {
		...deepmerge(defaultConfigs, configs),

		// If we rely on deepmerge, webpack messes up
		config: configs.config
	};

	return serve({}, mergedConfigs);
};