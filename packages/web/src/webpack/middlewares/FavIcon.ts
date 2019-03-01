// tslint:disable:object-literal-sort-keys
import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@bluebase/cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import merge from 'webpack-merge';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import WebpackBuilder from '../WebpackBuilder';

// tslint:disable-next-line:no-var-requires

const removeNil = Utils.removeNil;

/**
 * Javascript loader
 * @param config
 * @param builder
 */
const FavIcon: WebpackBuilderMiddleware =
	() =>
	(config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

		const newConfig: any = merge(config, {

			plugins: removeNil([

			// favIconPlugin
                    new FaviconsWebpackPlugin(builder.configs.favIconConfig)
			]),
		});
		return newConfig;
	};

export default FavIcon;
