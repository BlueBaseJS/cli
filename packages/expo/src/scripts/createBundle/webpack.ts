import webpack from 'webpack';

export function createBundleScript() {

	const configs: webpack.Configuration = {
		mode: 'development',
		devtool: 'inline-source-map',
		entry: './entry.ts',
		output: {
			filename: 'bundle.js'
		},
		resolve: {
			// Add `.ts` and `.tsx` as a resolvable extension.
			extensions: ['.ts', '.tsx', '.js']
		},
		module: {
			rules: [
				// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
				{ test: /\.tsx?$/, loader: require.resolve('ts-loader') }
			]
		}
	};

	const compiler = webpack(configs);

	return new Promise((resolve, reject) => {

		compiler.run((err, stats) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(stats);
		});

	}) as Promise<webpack.Stats>;
};
