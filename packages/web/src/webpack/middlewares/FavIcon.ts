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
                    new FaviconsWebpackPlugin({
                        // Your source logo
                        logo: 'my-logo.png',
                        // The prefix for all image files (might be a folder or a name)
                        prefix: 'icons-[hash]/',
                        // Emit all stats of the generated icons
                        emitStats: false,
                        // The name of the json containing all favicon information
                        statsFilename: 'iconstats-[hash].json',
                        // Generate a cache file with control hashes and
                        // don't rebuild the favicons until those hashes change
                        persistentCache: true,
                        // Inject the html into the html-webpack-plugin
                        inject: true,
                        // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
                        background: '#fff',
                        // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
                        title: 'Webpack App',
                    
                        // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
                        icons: {
                          android: true,
                          appleIcon: true,
                          appleStartup: true,
                          coast: false,
                          favicons: true,
                          firefox: true,
                          opengraph: false,
                          twitter: false,
                          yandex: false,
                          windows: false
                        }
                      })
			]),
		});
		return newConfig;
	};

export default FavIcon;