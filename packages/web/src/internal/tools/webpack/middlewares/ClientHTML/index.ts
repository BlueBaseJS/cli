// import * as webpack from 'webpack';
import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../../WebpackBuilder";
import merge from 'webpack-merge';
import path from 'path';

const removeNil = Utils.removeNil;

/**
 * Generate index.html for client
 * @param config 
 * @param builder 
 */
const ClientHTML: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		plugins: removeNil([

			// We need this plugin to enable hot reloading of our client.
			builder.ifDevClient(
				() => new HtmlWebpackPlugin({
					filename: 'index.html',
					template: `${path.resolve(__dirname, './template.js')}`,
					production: true,
					minify: {
						removeComments: true,
						collapseWhitespace: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						// removeNilAttributes: true,
						removeStyleLinkTypeAttributes: true,
						keepClosingSlash: true,
						minifyJS: true,
						minifyCSS: true,
						minifyURLs: true,
					},
					inject: true,
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
}

export default ClientHTML;