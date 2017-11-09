const path = require('path');
const dir = process.cwd();
const config = {
	entry: path.resolve(dir, 'index.js'),
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
      'react': path.resolve(path.join(dir, 'node_modules', 'react')),
      'react-dom': path.resolve(path.join(dir, 'node_modules', 'react-dom')),
      'reactxp': path.resolve(path.join(dir, 'node_modules', 'reactxp')),
    },
	},

	module: {
		loaders: []
	},

	plugins: [
	]
};

module.exports = config;
