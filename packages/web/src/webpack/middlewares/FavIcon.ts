// tslint:disable:object-literal-sort-keys
import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@bluebase/cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import merge from 'webpack-merge';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

// tslint:disable-next-line:no-var-requires

const removeNil = Utils.removeNil;

/**
 * Javascript loader
 * @param config
 * @param builder
 */
const FavIcon: WebpackBuilderMiddleware =
	() =>
	(config: WebpackConfig): WebpackConfig => {

		const newConfig: any = merge(config, {

			plugins: removeNil([

			// favIconPlugin
                    new FaviconsWebpackPlugin({logo: './assets/web/icon.png'})
			]),
		});
		return newConfig;
	};

export default FavIcon;