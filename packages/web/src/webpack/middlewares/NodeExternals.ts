import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import WebpackBuilder from '../WebpackBuilder';
import fromRoot from '../../scripts/fromRoot';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

const removeNil = Utils.removeNil;

/**
 * We don't want our node_modules to be bundled with any bundle that is
 * targetting the node environment, prefering them to be resolved via
 * native node module system. Therefore we use the `webpack-node-externals`
 * library to help us generate an externals configuration that will
 * ignore all the node_modules.
 * @param config
 * @param builder
 */
const NodeExternals: WebpackBuilderMiddleware =
	(options: nodeExternals.Options = {}) =>
	(config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

		return merge(config, {

			externals: [
				nodeExternals(
					// Some of our node_modules may contain files that depend on our
					// webpack loaders, e.g. CSS or SASS.
					// For these cases please make sure that the file extensions are
					// registered within the following configuration setting.
					{
						// Modules dir
						modulesDir: fromRoot('./node_modules'),

						whitelist: removeNil([
							// We always want the source-map-support included in
							// our node target bundles.
							'source-map-support/register',
						])
							// And any items that have been whitelisted in the config need
							// to be included in the bundling process too.
							.concat(builder.configs.nodeExternalsFileTypeWhitelist || []),

						// Overriders
						...options,
					}
				),
			],

		});
	};

export default NodeExternals;