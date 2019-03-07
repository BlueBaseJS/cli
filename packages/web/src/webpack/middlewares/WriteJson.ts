import { WebpackBuilderMiddleware } from '../../types';
// tslint:disable-next-line: sort-imports
import { Configuration as WebpackConfig } from 'webpack';
import merge from 'webpack-merge';

const WriteJsonPlugin = require('write-json-webpack-plugin');

/**
 * Add jarvis dashboard
 * @param config
 * @param builder
 */
const WriteJsonMiddleware: WebpackBuilderMiddleware =
	(opts: {
		object?: any,
		path?: string,
		filename?: string,
		pretty?: boolean,
	}) =>
	(config: WebpackConfig): WebpackConfig => {

		return merge(config, {

			plugins: [new WriteJsonPlugin(opts)],

		});
	};

export default WriteJsonMiddleware;