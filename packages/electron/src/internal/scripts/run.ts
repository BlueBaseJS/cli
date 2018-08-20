import { Command } from '@oclif/command';
import { ElectronEngine } from '../engine';
import { Utils } from '@blueeast/bluerain-cli-core';
import mainWebpackConfigs from '../configFiles/webpack.config.main';
import rendererWebpackConfigs from '../configFiles/webpack.config.renderer';
import webpack from 'webpack';

export const run = async (ctx: Command): Promise<void> => {

	ctx.log(`Electron run`);

	const engine = new ElectronEngine();
	await engine.prepare();

	// // Configs
	// const config = (key: string) => engine.Configs.get(key);
	const bootPath = await engine.Files.resolveWithFallback('boot');
	const publicAssetsPath = await engine.Files.resolveWithFallback('publicDir');

	debugger;

	// const buildOpts = {
	// 	bootPath,
	// 	engine,
	// 	mode: 'development',
	// 	publicAssetsPath,
	// 	target: 'client'
	// };

	const mainConfigs = await mainWebpackConfigs({}, {
		bootPath,
		engine,
		mode: 'development',
		publicAssetsPath,
		target: 'client'
	});
	const rendererConfigs = await rendererWebpackConfigs({}, {
		bootPath,
		engine,
		mode: 'development',
		publicAssetsPath,
		target: 'client'
	});

	// console.log('configs', configs);
	// Utils.logger.info(configs);

	const mainCompiler = webpack(mainConfigs);
	const rendererCompiler = webpack(rendererConfigs);

	Utils.logger.info('Building main process...');
	mainCompiler.run((err, _stats) => {
		if (err) { throw err; }
		// tslint:disable-next-line:no-console
		// console.log(stats.toString({ colors: true }));
		Utils.logger.info('Building renderer process...');

		rendererCompiler.run((err2, _stats2) => {
			if (err2) { throw err2; }
			// tslint:disable-next-line:no-console
			// console.log(stats2.toString({ colors: true }));
			Utils.logger.info('Done...');

		});
	});

	return;
};
