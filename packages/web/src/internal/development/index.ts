import * as webpack from 'webpack';
import { PlatformConfigs } from '../../engine/PlatformConfigs';
import { Utils } from '@blueeast/bluerain-cli-core';
import chokidar from 'chokidar';

// tslint:disable-next-line:no-var-requires
const HotDevelopment = require('./hotDevelopment').default;

const logger = Utils.logger;

export type ConfigsBundle = PlatformConfigs & { publicAssetsPath: string };
export type getWebpackConfigsFn = (configs: PlatformConfigs) => webpack.Configuration;

export default async (configsBundle: ConfigsBundle, getWebpackConfigs: getWebpackConfigsFn) => {

	let devServer = new HotDevelopment();
	await devServer.start(configsBundle, getWebpackConfigs);

  // Any changes to our webpack bundleConfigs should restart the development devServer.
	const watcher = chokidar.watch([
		Utils.fromProjectRoot('bluerain'),
		// Utils.fromProjectRoot('src'),
	]);

	watcher.on('ready', () => {
		watcher.on('change', async () => {
			logger.log({
				label: 'BlueRain Engine Web',
				level: 'warn',
				message: 'Project build configuration has changed. Restarting the development devServer...',
			});

			await devServer.dispose();

			Object.keys(require.cache).forEach((modulePath) => {
				if (modulePath.indexOf('bluerain') !== -1) {
					delete require.cache[modulePath];
				}
			});

			// Create a new development devServer.
			devServer = new HotDevelopment();

			await devServer.start(configsBundle, getWebpackConfigs);
		});
	});

  // If we receive a kill cmd then we will first try to dispose our listeners.
	process.on('SIGTERM', () => devServer && devServer.dispose().then(() => process.exit(0)));
};
