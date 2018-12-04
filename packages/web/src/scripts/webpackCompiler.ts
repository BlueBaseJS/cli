import webpack from 'webpack';

/**
 * compiles a webpack config.
 * @param configs
 */
export const webpackCompiler = async (compiler: webpack.Compiler): Promise<webpack.Stats> => {

	return new Promise((resolve, _reject) => {

		compiler.run((err, stats) => {
			if (err) { throw (err); }

			resolve(stats);
		});

	}) as Promise<webpack.Stats>;
};