import { Configuration as WebpackConfig } from 'webpack';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';

/**
 * Patch React Native imports
 * @param config 
 * @param builder 
 */
const ReactNative: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	return merge(config, {

		resolve: {
			alias: {
				'react-native$': builder.useOwn('react-native-web'),
			},
		},

	});
}

export default ReactNative;