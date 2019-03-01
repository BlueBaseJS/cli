import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { Utils } from '@bluebase/cli-core';
import WebpackBuilder from '../WebpackBuilder';
import { WebpackBuilderMiddleware } from '../../types';
// tslint:disable:object-literal-sort-keys
// tslint:disable-next-line: sort-imports
import { Configuration as WebpackConfig } from 'webpack';
import merge from 'webpack-merge';

// tslint:disable-next-line:no-var-requires

const removeNil = Utils.removeNil;

/**
 * Javascript loader
 * @param config
 * @param builder
 */
const FavIcon: WebpackBuilderMiddleware = () => (
	config: WebpackConfig,
	builder: WebpackBuilder
): WebpackConfig => {
	const newConfig: any = merge(config, {
		plugins: removeNil([
			// favIconPlugin
			new FaviconsWebpackPlugin(builder.configs.favIconConfig),
		]),
	});
	return newConfig;
};

export default FavIcon;
