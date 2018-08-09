import * as webpack from 'webpack';
import chokidar from 'chokidar';
import { Utils } from '@blueeast/bluerain-cli-core';
import logger from '../../logger';
import { PlatformConfigs } from '../PlatformConfigs';

const HotDevelopment = require('./hotDevelopment').default;

export type ConfigsBundle = PlatformConfigs & { publicAssetsPath: string };
export type getWebpackConfigsFn = (configs: PlatformConfigs) => webpack.Configuration;

export default async (configsBundle: ConfigsBundle, getWebpackConfigs: getWebpackConfigsFn) => {

	let devServer = new HotDevelopment();
	await devServer.start(configsBundle, getWebpackConfigs);

  // Any changes to our webpack bundleConfigs should restart the development devServer.
	const watcher = chokidar.watch([
    // Utils.fromProjectRoot('bluerain'),
		Utils.fromProjectRoot('src'),
	], { ignored: '*.js', });

	watcher.on('ready', () => {
		watcher.on('change', async () => {
			logger.log({
				level: 'warn',
				message: 'Project build configuration has changed. Restarting the development devServer...',
				title: 'webpack',
			});

			await devServer.dispose();

			Object.keys(require.cache).forEach((modulePath) => {
				if (modulePath.indexOf('bluerain') !== -1) {
					delete require.cache[modulePath];
				} else if (modulePath.indexOf('src') !== -1) {
					delete require.cache[modulePath];
				}
			});

			// // Re-require the development devServer so that all new configs are used.
			// HotDevelopment = require('./hotDevelopment').default;

			// Create a new development devServer.
			devServer = new HotDevelopment();

			await devServer.start(configsBundle, getWebpackConfigs);

      // devServer.dispose().then(() => {
      //   // Make sure our new webpack bundleConfigs aren't in the module cache.
      //   Object.keys(require.cache).forEach((modulePath) => {
      //     if (modulePath.indexOf('bluerain') !== -1) {
      //       delete require.cache[modulePath];
      //     } else if (modulePath.indexOf('src') !== -1) {
      //       delete require.cache[modulePath];
      //     }
      //   });

      //   // Re-require the development devServer so that all new configs are used.
      //   HotDevelopment = require('./hotDevelopment').default;

      //   // Create a new development devServer.
			// 	devServer = new HotDevelopment();
			// 	devServer.start(configsBundle, getWebpackConfigs).then();
      // });
		});
	});

  // If we receive a kill cmd then we will first try to dispose our listeners.
	process.on('SIGTERM', () => devServer && devServer.dispose().then(() => process.exit(0)));
};
