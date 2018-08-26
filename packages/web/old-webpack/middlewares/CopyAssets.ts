import { Configuration as WebpackConfig } from 'webpack';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';

/**
 * Hot Module Replacement support
 * @param config 
 * @param builder 
 */
const CopyAssets: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		plugins: [

			new CopyWebpackPlugin([{
				from: builder.configs.publicAssetsPath, 
				to: `${config.output && config.output.path}/assets`
			}])
		]
	});
}

export default CopyAssets;