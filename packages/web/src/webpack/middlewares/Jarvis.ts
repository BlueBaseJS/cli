import { Utils } from '@bluebase/cli-core';
import WebpackBuilder from '../WebpackBuilder';
import { WebpackBuilderMiddleware } from '../../types';
// tslint:disable-next-line: sort-imports
import { Configuration as WebpackConfig } from 'webpack';
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
	(port: number = 1338) =>
	(config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

		return merge(config, {

			plugins: removeNil([
				builder.ifDevClient(
					() =>
						new Jarvis({
							port
						})
				),
			]),

		});
	};

export default JarvisMiddleware;