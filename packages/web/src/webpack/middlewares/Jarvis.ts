import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@bluebase/cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import WebpackBuilder from '../WebpackBuilder';
import merge from 'webpack-merge';

// tslint:disable-next-line:no-var-requires
const Jarvis = require('webpack-jarvis');

const removeNil = Utils.removeNil;

/**
 * Add jarvis dashboard
 * @param config
 * @param builder
 */
const JarvisMiddleware: WebpackBuilderMiddleware =
	() =>
	(config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

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
	};

export default JarvisMiddleware;