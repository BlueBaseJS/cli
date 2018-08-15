import { Command } from '@oclif/command';
import Debug from 'debug';
import development from '../../internal/development';
import { PlatformConfigs } from '../../internal/configFiles';
import { WebEngine } from '../../internal/engine';

const debug = Debug('web-engine-run');

export class RunCommand extends Command {
	async run() {
		const engine = new WebEngine();
		await engine.prepare();

		const bootPath = await engine.Files.resolveWithFallback('boot');
		debug('bootPath', bootPath);

		const publicAssetsPath = await engine.Files.resolveWithFallback('publicDir');
		debug('publicPath', publicAssetsPath);

		// const configs = (name: string) => engine.Configs.get(name);
		const configs = engine.Configs.toObject() as PlatformConfigs;

		const getWebpackConfigs = (configs: PlatformConfigs) => {
			return engine.Filters.run('engine.web.file.webpack', {}, {
				bootPath,
				publicAssetsPath,
				engine,
				mode: 'development',
				...configs
			});
		};

		await development({ ...configs, publicAssetsPath }, getWebpackConfigs);
	}
}
