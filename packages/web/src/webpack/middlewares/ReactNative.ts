import { Configuration as WebpackConfig } from 'webpack';
import { WebpackBuilderMiddleware } from '../../types';
import merge from 'webpack-merge';
import useOwn from '../../scripts/useOwn';

/**
 * Patch React Native imports
 * @param config
 * @param builder
 */
const ReactNative: WebpackBuilderMiddleware = () => (config: WebpackConfig): WebpackConfig => {

	return merge(config, {

		resolve: {
			alias: {
				'react-native$': useOwn('react-native-web'),
			},
		},

	});
};

export default ReactNative;