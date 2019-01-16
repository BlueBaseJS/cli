import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@bluebase/cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import WebpackBuilder from '../WebpackBuilder';
import { fromRoot } from '../../helpers/fromRoot';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils';
 
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
				
				// externals: externalsConfig(builder.isServer, 'node'),

				externals: [

				nodeExternals(
					// Some of our node_modules may contain files that depend on our
					// webpack loaders, e.g. CSS or SASS.
					// For these cases please make sure that the file extensions are
					// registered within the following configuration setting.
					{
						// Modules dir
						modulesDir: fromRoot('./node_modules'),

						// modulesFromFile: {
						// 	exclude: ['devDependencies'],
						// 	include: ['dependencies']
						// } as any,

						whitelist: removeNil([
							// We always want the source-map-support included in
							// our node target bundles.
							'source-map-support/register',

							// Since the CLI maybe installed globally, the dependencies
							// of these repo may not be available in project modules
							// So, we're not excluding them.
							...getDependenciesRecursive('@bluebase/cli-core'),
							...getDependenciesRecursive('express'),
							...getDependenciesRecursive('react-helmet'),
							...getDependenciesRecursive('react-native-web'),
							...getDependenciesRecursive('react-art'),
							...getDependenciesRecursive('helmet'),
							...getDependenciesRecursive('hpp'),
							
							// We want to add project's dependencies too
							// because they may need the react-native alias
							...getDependenciesRecursive('@bluebase/core'),
							...getDependenciesRecursive(fromProjectRoot(), ['expo', 'react-native']),
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

function getDependenciesRecursive(_package: string, skip: string[] = []) {
	
	const list: string[] = [];

	function run(pkg: string) {
		const pkgJson = require(`${pkg}/package.json`);
	
		const name = pkgJson.name;
	
		if (!name) {
			return;
		}
	
		// This package is already processed, skip!
		if (list.indexOf(name) !== -1) {
			return;
		}
	
		// The package is in skip list
		if (skip.indexOf(name) !== -1) {
			return;
		}
	
		const dependencies = Object.keys(pkgJson.dependencies || {});
	
		list.push(name);
	
		dependencies.forEach(dep => {
			run(dep);
		});
	}

	run(_package);

	return list.map(dep => new RegExp(`^${dep}`, 'i'));
}

export default NodeExternals;