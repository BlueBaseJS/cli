import { Configuration as WebpackConfig } from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';

/**
 * Hot Module Replacement support
 * @param config 
 * @param builder 
 */
const CleanBuildDir: WebpackBuilderMiddleware = (config: WebpackConfig, _builder: WebpackBuilder): WebpackConfig => {

	if (!config.output || !config.output.path) {
		return config;
	}

	return merge(config, {

		plugins: [
			new CleanWebpackPlugin(config.output.path)
		]
	});
}

export default CleanBuildDir;