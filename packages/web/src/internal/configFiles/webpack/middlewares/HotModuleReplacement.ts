import * as webpack from 'webpack';
import { Configuration as WebpackConfig } from 'webpack';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';
import { Utils } from '@blueeast/bluerain-cli-core';

const removeNil = Utils.removeNil;

/**
 * Hot Module Replacement support
 * @param config 
 * @param builder 
 */
const HotModuleReplacement: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge.strategy(
		{
			entry: 'prepend', // or 'replace', defaults to 'append'
			'entry.index': 'prepend'
		}
	)(config, {

		entry: {
			index: removeNil([
				// Extends hot reloading with the ability to hot path React Components.
				// This should always be at the top of your entries list. Only put
				// polyfills above it.
				builder.ifDevClient(builder.useOwn('react-hot-loader/patch')),

				// Required to support hot reloading of our client.
				builder.ifDevClient(
					() =>
						`${builder.useOwn('webpack-hot-middleware/client')}?reload=true&path=http://${builder.configs.host}:${builder.configs.clientDevServerPort}/__webpack_hmr`,
				),
			])
		},

		plugins: removeNil([

			// We need this plugin to enable hot reloading of our client.
			builder.ifDevClient(() => new webpack.HotModuleReplacementPlugin({
				// multiStep: true,
			})),
		])
	});
}

export default HotModuleReplacement;