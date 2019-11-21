import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackBuilder from '../WebpackBuilder';
import { WebpackBuilderMiddleware } from '../../types';
// tslint:disable-next-line: sort-imports
import { Configuration as WebpackConfig } from 'webpack';
import merge from 'webpack-merge';

/**
 * Clean the directory before a fresh build
 * @param config
 * @param builder
 */
const CleanBuildDir: WebpackBuilderMiddleware = () => (
	config: WebpackConfig,
	_builder: WebpackBuilder
): WebpackConfig => {
	// if (!config.output || !config.output.path) {
	// 	return config;
	// }

	return merge(config, {
		plugins: [new CleanWebpackPlugin()],
	});
};

export default CleanBuildDir;
