import * as Core from '@blueeast/bluerain-cli-core';
import Debug from 'debug';
import rmfr from 'rmfr';
import webpack from 'webpack';

const debug = Debug('web-engine-build');

export const build: Core.Command = {
	slug: 'build',
	// tslint:disable-next-line:object-literal-sort-keys
	description: 'Launches Development Server',
	handler: async (_opts: any, engine: Core.Engine) => {

		const config = (key: string) => engine.Configs.get(key);

		// Configs
		const bootPath = await engine.Files.resolveWithFallback('boot');
		// debug('bootPath', bootPath);

		// const publicPath = await engine.Files.resolveWithFallback('publicDir');
		// debug('publicPath', publicPath);

		// First clear the build output dir.
		const buildOutputPath = Core.Utils.fromProjectRoot(config('buildOutputPath'));
		debug('Deleting previous build at:', buildOutputPath);
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

				try {
					const compiler = webpack(webpackConfigs);
					debug(`Compiling Webpack on ${target}`);

					compiler.run((err, stats) => {
						if (err) { throw err; }
						debug(stats.toString({ colors: true }));
					});

				} catch (error) {
					debug(error);
				}
			});
		return;
	},
};
