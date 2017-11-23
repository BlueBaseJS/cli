'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {smart} = require('webpack-merge');
const fs = require('fs');

const PORT = 3000;

const extractCSS = new ExtractTextPlugin('style.css');

module.exports = ({ platform, prod } = {}) => {
	const electronMain = platform === 'electron';
	const electronRenderer = !electronMain;

	const cssLoaders = ['css-loader', 'sass-loader'];

	let config =  {
		devServer: {
			hot: true,
			port: PORT,
			historyApiFallback: true,
			// stats: 'errors-only',
			contentBase: path.join(process.cwd(), '/resources/')
		},
		devtool: prod ? undefined : 'inline-source-map',
		entry: electronMain
      ? [path.resolve(__dirname, './app/main')]
      : [
	...(!prod
            ? [
	'react-hot-loader/patch',
	`webpack-dev-server/client?http://localhost:${PORT}`,
	'webpack/hot/only-dev-server'
]
            : []),
	path.resolve(__dirname,'../', 'boot.js')
],
		externals: electronMain && !prod ? ['source-map-support'] : [],
		module: {
			exprContextCritical: false,
			rules: [
				{
					test: /\.js($|\?)/,
					use: [
						...(electronRenderer && !prod ? ['react-hot-loader/webpack'] : []),
						'babel-loader'
					],
					exclude: /node_modules/
				},
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
        // {
        //   test: /\.css($|\?)/,
        //   use: prod ? extractCSS.extract({
        //     fallback: "style-loader",
        //     use: cssLoaders
        //   }) : ["style-loader", ...cssLoaders],
        //   exclude: /node_modules/
        // },
				{
					test: /\.(css|scss)$/,
					loaders: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.node$/,
					use: 'node-loader'
				},
        { test: /\.(graphql|gql)$/, loader: 'graphql-tag/loader' },
				{
					test: /\.png$/,
					loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/png'
				},
				{
					test: /\.jpg$/,
					loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/jpeg'
				},
				{
					test: /\.(woff|woff2)$/,
					loader: 'url-loader?prefix=fonts/&limit=8000&mimetype=application/font-woff'
				},
        { test: /\.ttf$/, loader: 'file-loader?prefix=fonts/' },
        { test: /\.eot$/, loader: 'file-loader?prefix=fonts/' },
        { test: /\.svg/, loader: 'file-loader' }
			]
		},
		node: electronMain
      ? {
	__dirname: false, // for asar
	__filename: false
}
      : {},
		output: {
			filename: electronMain ? 'index.js' : 'bundle.js',
			libraryTarget: 'commonjs2',
			path: path.resolve(process.cwd(), 'electron/build'),
			publicPath: electronRenderer && !prod
        ? `http://localhost:${PORT}/build/`
        : undefined
		},
		plugins: [
			// new ProgressBarPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(
          prod ? 'production' : 'development'
        ),
				'global.GENTLY': false,
				'process.env.DEBUG_PROD': JSON.stringify(
          process.env.DEBUG_PROD || 'false'
        )
			}),
			...(electronRenderer
        ? [
	...(prod
              ? [extractCSS]
              : [new webpack.HotModuleReplacementPlugin()]),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.join(__dirname, '/app/renderer/index.html')
	}),
	// new CopyPlugin([{ from: 'resources', ignore: ['.gitkeep'] }])
]
        : [
	...(prod
              ? []
              : [
	new webpack.BannerPlugin({
		banner: 'require("source-map-support").install();',
		entryOnly: false,
		raw: true
	})
])
]),
			...(prod
        ? [new BabiliPlugin()]
        : [
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
])
		],
		target: electronMain ? 'electron-main' : 'electron-renderer'
	};
	const webpackPath = path.resolve(process.cwd(),'./electron/webpack.config.js')
	if (fs.existsSync(webpackPath)) {
		try{
			const addedConfig = require(webpackPath);
			if (typeof addedConfig === "function"){
				config = addedConfig(config, prod? 'production' : 'development');
			}else {
			config = smart( config, addedConfig);
			}
		}
		catch(e){console.error(e)};
	}
	return config;
};
