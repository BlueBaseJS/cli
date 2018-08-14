import { Configuration as WebpackConfig } from 'webpack';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';
var WriteJsonPlugin = require('write-json-webpack-plugin');
import { Utils } from '@blueeast/bluerain-cli-core';

const removeNil = Utils.removeNil;

/**
 * Create a configs.json file for server to consume during run time
 * @param config 
 * @param builder 
 */
const ConfigsJson: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		plugins: removeNil([
			builder.ifNode(
				new WriteJsonPlugin({
					filename: 'configs.json',
					object: builder.configs,
					pretty: true // makes file human-readable (default false)
				}),
			),
		]),

	});
}

export default ConfigsJson;