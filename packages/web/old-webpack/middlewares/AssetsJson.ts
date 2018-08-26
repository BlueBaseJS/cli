import { Configuration as WebpackConfig } from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';
import { Utils } from '@blueeast/bluerain-cli-core';

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
const AssetsJson: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		plugins: removeNil([
			builder.ifClient(
				() =>
					new AssetsPlugin({
						filename: builder.configs.bundleAssetsFileName,
						path: builder.bundleConfig.outputPath,
					}),
			),
		]),

	});
}

export default AssetsJson;