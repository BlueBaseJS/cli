import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import AssetsPlugin from 'assets-webpack-plugin';
import WebpackBuilder from '../WebpackBuilder';
import merge from 'webpack-merge';

const removeNil = Utils.removeNil;

/**
 * Generates a JSON file containing a map of all the output files for
 * our webpack bundle.  A necessisty for our server rendering process
 * as we need to interogate these files in order to know what JS/CSS
 * we need to inject into our HTML. We only need to know the assets for
 * our client bundle.
 * @param config
 * @param builder
 */
const AssetsJson: WebpackBuilderMiddleware = () => (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		plugins: removeNil([
			builder.ifClient(
				() =>
					new AssetsPlugin({
						filename: builder.configs.bundleAssetsFileName,
						path: builder.configs.outputPath,
						prettyPrint: builder.isDev ? true : false,
					}),
			),
		]),

	});
};

export default AssetsJson;