import webpack from 'webpack';

/**
 * compiles a webpack config.
 * @param configs
 */
export const webpackCompile = async (configs: webpack.Configuration): Promise<webpack.Stats> => {

	return new Promise((resolve, reject) => {

		const compiler = webpack(configs);

		compiler.run((err, stats) => {
			if (err) { reject(err); }

			resolve(stats);
		});

	}) as Promise<webpack.Stats>;
};