import { Configuration as WebpackConfig } from 'webpack';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';
import { Utils } from '@blueeast/bluerain-cli-core';
const Jarvis = require('webpack-jarvis');

const removeNil = Utils.removeNil;

/**
 * Add jarvis dashboard
 * @param config 
 * @param builder 
 */
const JarvisMiddleware: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		plugins: removeNil([
			builder.ifDevClient(
				() =>
					new Jarvis({
						port: 1338 // optional: set a port
					})
			),
		]),

	});
}

export default JarvisMiddleware;