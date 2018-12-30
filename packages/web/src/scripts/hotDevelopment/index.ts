import { HotClientServer } from './HotClientServer';
import { HotNodeServer } from './HotNodeServer';
import { Utils } from '@bluebase/cli-core';
import chokidar from 'chokidar';
import webpack from 'webpack';

export interface HotDevelopmentOptions {
	assetsDirPath: string;
	bluebaseJsPath: string;
	buildDirPath: string;
	configDirPath: string;

	serverConfigs: any,
	serverCompiler: webpack.Compiler,
	webpackServerConfigs: webpack.Configuration,

	clientConfigs: any,
	clientCompiler: webpack.Compiler,
	webpackClientConfigs: webpack.Configuration,

	[key: string]: any;
}


export default async (opts: HotDevelopmentOptions) => {

	let hotClient = new HotClientServer(opts);
	let hotServer = new HotNodeServer(opts);

	hotClient.start();
	hotServer.start();

	// Any changes to our webpack bundleConfigs should restart the development devServer.
	const watcher = chokidar.watch([
		Utils.fromProjectRoot('bluebase'),
		// Utils.fromProjectRoot('src'),
	]);

	watcher.on('ready', () => {
		watcher.on('change', async () => {
			Utils.logger.log({
				label: '@bluebase/cli/web',
				level: 'warn',
				message: 'Project build configuration has changed. Restarting the development devServer...',
			});

			await hotClient.dispose();
			await hotServer.dispose();

			Object.keys(require.cache).forEach((modulePath) => {
				if (modulePath.indexOf('bluebase') !== -1) {
					delete require.cache[modulePath];
				}
			});

			hotClient = new HotClientServer(opts);
			hotServer = new HotNodeServer(opts);

			hotClient.start();
			hotServer.start();
		});
	});

	// If we receive a kill cmd then we will first try to dispose our listeners.
	process.on('SIGTERM', () => {

		if (hotClient) {
			hotClient.dispose().then(() => {

				if (hotServer) {
					hotClient.dispose().then(() => {
						process.exit(0);
					});
				}
			});
		}
	});
};
