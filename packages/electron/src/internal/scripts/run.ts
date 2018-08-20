import { Command } from '@oclif/command';
import { ElectronEngine } from '../engine';
import { Utils } from '@blueeast/bluerain-cli-core';
import webpack from 'webpack';
import webpackConfigs from '../configFiles/webpack.config';

export const run = async (ctx: Command): Promise<void> => {

	ctx.log(`Electron run`);

	const engine = new ElectronEngine();
	await engine.prepare();

	// // Configs
	// const config = (key: string) => engine.Configs.get(key);
	const bootPath = await engine.Files.resolveWithFallback('boot');
	const publicAssetsPath = await engine.Files.resolveWithFallback('publicDir');

	debugger;
	Utils.logger.info('hey');

	const configs = await webpackConfigs({}, {
		bootPath,
		engine,
		mode: 'development',
		publicAssetsPath,
		target: 'client'
	});

	console.log('configs', configs);

	Utils.logger.info(configs);

	const compiler = webpack(configs);

	compiler.run((err, stats) => {
		if (err) { throw err; }
		// tslint:disable-next-line:no-console
		console.log(stats.toString({ colors: true }));
	});

	return;
};
