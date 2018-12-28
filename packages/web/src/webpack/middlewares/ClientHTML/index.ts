// import * as webpack from 'webpack';
import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@bluebase/cli-core';
import { WebpackBuilderMiddleware } from '../../../types';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBuilder from '../../WebpackBuilder';
import merge from 'webpack-merge';
import path from 'path';

const removeNil = Utils.removeNil;

/**
 * Generate index.html for client
 * @param config
 * @param builder
 */
const ClientHTML: WebpackBuilderMiddleware = () => (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		plugins: removeNil([

			// We need this plugin to enable hot reloading of our client.
			builder.ifDevClient(
				() => new HtmlWebpackPlugin({
					filename: 'index.html',
					inject: true,
					minify: {
						collapseWhitespace: true,
						keepClosingSlash: true,
						minifyCSS: true,
						minifyJS: true,
						minifyURLs: true,
						removeComments: true,
						removeRedundantAttributes: true,
						removeStyleLinkTypeAttributes: true,
						// removeNilAttributes: true,
						useShortDoctype: true,
					},
					production: true,
					template: `${path.resolve(__dirname, './template.js')}`,
					// We pass our config and client config script compoent as it will
					// be needed by the offline template.
					// custom: {
					// 	config,
					// 	ClientConfig,
					// },
				}),
			),
		])
	});
};

export default ClientHTML;