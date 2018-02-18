const path = require('path');
const dir = process.cwd();
const { smart } = require('webpack-merge');
const fs = require('fs');
let config = {
	entry: path.resolve(__dirname, '../', 'boot.js'),
	output: {
		filename: 'bundle.js',
		path:  path.resolve(dir, 'dist')
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		extensions: ['.webpack.js', '.web.js', '.js'],
		modules: ['src', 'node_modules'],
		alias: {
			react: path.resolve(path.join(dir, 'node_modules', 'react')),
			'react-dom': path.resolve(path.join(dir, 'node_modules', 'react-dom')),
			reactxp: path.resolve(path.join(dir, 'node_modules', 'reactxp')),
		},
	},

	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: require.resolve('babel-loader'), exclude: /node_modules/ },
			{ test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=fonts/&limit=8000&mimetype=application/font-woff' },
			{ test: /\.(ttf|eot)$/, loader: 'file-loader?prefix=fonts/' },
			{ test: /\.(gif|png|jpe?g|svg)$/i, loader: 'file-loader' }
		]
	},

	plugins: [
	]
};
const webpackPath = path.resolve(dir, './web/webpack.config.js');
if (fs.existsSync(webpackPath)) {
	try {
		const addedConfig = require(webpackPath);
		if (typeof addedConfig === 'function') {
			config = addedConfig(config, 'development');
		} else {
			config = smart(config, addedConfig );
		}
	} catch (e) { console.error(e); }
}
module.exports = config;
