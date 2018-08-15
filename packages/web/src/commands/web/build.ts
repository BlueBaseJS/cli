import * as Core from '@blueeast/bluerain-cli-core';
import { Command } from '@oclif/command';
import rmfr from 'rmfr';
import webpack from 'webpack';
import { WebEngine } from '../../internal/engine';

const logger = Core.Utils.logger;

export class GoodbyeCommand extends Command {
	async run() {
		console.log('goodbye, world!')

		const engine = new WebEngine();
		await engine.prepare();


		const config = (key: string) => engine.Configs.get(key);

		// Configs
		const bootPath = await engine.Files.resolveWithFallback('boot');
		// debug('bootPath', bootPath);

		// const publicAssetsPath = await engine.Files.resolveWithFallback('publicDir');
		// debug('publicPath', publicPath);

		// First clear the build output dir.
		const buildOutputPath = Core.Utils.fromProjectRoot(config('buildOutputPath'));
		logger.log({
			label: 'BlueRain Engine Web',
			level: 'info',
			message: `Deleting previous build at: ${buildOutputPath}`
		});
		await rmfr(buildOutputPath);

		// Get our "fixed" bundle names
		Object.keys(config('bundles'))
			// And the "additional" bundle names
			.concat(Object.keys(config('additionalNodeBundles')))
			// And then build them all.
			.forEach((target) => {

				const webpackConfigs = engine.Filters.run('engine.web.file.webpack', {}, {
					bootPath,
					engine,
					mode: 'development',
					target,
				});

				const compiler = webpack(webpackConfigs);
				logger.log({
					label: 'BlueRain Engine Web',
					level: 'info',
					message: `Compiling Webpack on ${target}`
				});

				compiler.run((err) => {
					if (err) { throw err; }
					// debug(stats.toString({ colors: true }));
				});

			});
		return;
	}
}
