import Debug from 'debug';
import { Command, Engine } from '../../models';

const debug = Debug('web-engine-run');

export const run: Command = {
	description: 'Launches Development Server',
	handler: async (_opts, engine: Engine) => {

		// Configs
		const webpack = engine.Filters.run('engine.web.file.webpack');
		debug('Webpack', webpack);

		const bootPath = await engine.Files.resolveWithFallback('boot');
		debug('bootPath', bootPath);

		const publicPath = await engine.Files.resolveWithFallback('publicDir');
		debug('publicPath', publicPath);

		return;
	},
	slug: 'run',
};
