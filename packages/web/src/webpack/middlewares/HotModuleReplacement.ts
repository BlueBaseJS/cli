import { Configuration as WebpackConfig } from 'webpack';
// import { Utils } from '@bluebase/cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import WebpackBuilder from '../WebpackBuilder';
import merge from 'webpack-merge';
import { useOwn } from '../../helpers';

// const removeNil = Utils.removeNil;

/**
 * Hot Module Replacement support
 * @param config
 * @param builder
 */
const HotModuleReplacement: WebpackBuilderMiddleware =
	() =>
		(config: WebpackConfig, _builder: WebpackBuilder): WebpackConfig => {

			return merge.strategy(
				{
					entry: 'prepend', // or 'replace', defaults to 'append'
					'entry.index': 'prepend'
				}
			)(config, {

				// entry: {
				// 	index: removeNil([
				// 		// Extends hot reloading with the ability to hot path React Components.
				// 		// This should always be at the top of your entries list. Only put
				// 		// polyfills above it.
				// 		builder.ifDevClient(useOwn('react-hot-loader/patch')),

				// 		// Required to support hot reloading of our client.
				// 		builder.ifDevClient(
				// 			() =>
				// 				`${useOwn('webpack-hot-middleware/client')}?reload=true`,
				// 				// tslint:disable-next-line:max-line-length
				// 				// `${useOwn('webpack-hot-middleware/client')}?reload=true&path=http:
				// //${builder.configs.host}:${builder.configs.clientDevServerPort}/__webpack_hmr`,
				// 		),
				// 	])
				// },

				// plugins: removeNil([

				// 	// We need this plugin to enable hot reloading of our client.
				// 	builder.ifDevClient(() => new HotModuleReplacementPlugin({
				// 		// multiStep: true,
				// 	})),
				// ]),

				resolve: {
					alias: {
						'react-hot-loader': useOwn('react-hot-loader'),
						'webpack-hot-client': useOwn('webpack-hot-client'),
					},
				},
			});
		};

export default HotModuleReplacement;