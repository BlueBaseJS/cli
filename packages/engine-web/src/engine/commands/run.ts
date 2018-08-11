import { Command, Engine } from '@blueeast/bluerain-cli-core';
import { PlatformConfigs } from '../PlatformConfigs';
import Debug from 'debug';
import development from '../../internal/development';

const debug = Debug('web-engine-run');

export const run: Command = {
	slug: 'run',
	// tslint:disable-next-line:object-literal-sort-keys
	description: 'Launches Development Server',
	handler: async (_opts: any, engine: Engine) => {

		// Configs
		// const webpack = engine.Filters.run('engine.web.file.webpack');
		// debug('Webpack', webpack);

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
		return;
	},
};
