import { Command, Engine } from '@blueeast/bluerain-cli-core';
import Debug from 'debug';

const debug = Debug('web-engine-run');

export const run: Command = {
	slug: 'run',
	// tslint:disable-next-line:object-literal-sort-keys
	description: 'Launches Development Server',
	handler: async (_opts: any, engine: Engine) => {

		// Configs
		const webpack = engine.Filters.run('engine.web.file.webpack');
		debug('Webpack', webpack);

		const bootPath = await engine.Files.resolveWithFallback('boot');
		debug('bootPath', bootPath);

		const publicPath = await engine.Files.resolveWithFallback('publicDir');
		debug('publicPath', publicPath);

		return;
	},
};
