import { Configuration as WebpackConfig } from 'webpack';
import { WebpackBuilderMiddleware } from '../../types';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackBuilder from '../WebpackBuilder';
import merge from 'webpack-merge';

/**
 * Hot Module Replacement support
 * @param config
 * @param builder
 */
const CopyAssets: WebpackBuilderMiddleware =
	(options: { assetsDir: string } = { assetsDir: 'assets' }) =>
	(config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

		return merge(config, {

			plugins: [

				new CopyWebpackPlugin([{
					from: builder.configs.publicPath,
					to: `${builder.configs.outputPath}/${options.assetsDir}`
				}])
			]
		});
	};

export default CopyAssets;