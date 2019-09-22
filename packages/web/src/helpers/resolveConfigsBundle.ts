import { ConfigsBundle, PathsBundle } from '../types';

import defaultClientConfigs from '../configFiles/client.config';
import defaultClientWebpackConfigs from '../configFiles/webpack.config.client';
import defaultServerConfigs from '../configFiles/server.config';
import defaultServerWebpackConfigs from '../configFiles/webpack.config.server';

// Transpile files on the fly
// tslint:disable-next-line:no-var-requires
require('@babel/register')({
	extensions: ['.js', '.jsx', '.ts', '.tsx'],
	presets: ['@bluebase/code-standards/babel.config.js'],
});

export interface ConfigsBundleOptions {
	development: boolean;
}

/**
 * Returns everything required by the run script.
 *
 * i.e. resolves all paths and configs
 *
 * @param paths
 * @param options
 */

export function resolveConfigsBundle(
	paths: PathsBundle,
	options: Partial<ConfigsBundleOptions>
): ConfigsBundle {
	const { development = true } = options;

	///////////////////////////////////
	///// Generate Client Configs /////
	///////////////////////////////////

	// Get default configs
	let clientConfigs = defaultClientConfigs({} as any, paths);

	// Import the file
	let customClientConfigs = require(paths.clientConfigPath);
	customClientConfigs = customClientConfigs.default || customClientConfigs;

	// Use these configs
	clientConfigs = customClientConfigs(clientConfigs, paths);

	///////////////////////////////////
	///// Generate Server Configs /////
	///////////////////////////////////

	// Get default configs
	let serverConfigs = defaultServerConfigs({} as any, paths);

	// Import the file
	let customServerConfigs = require(paths.serverConfigPath);
	customServerConfigs = customServerConfigs.default || customServerConfigs;

	// Use these configs
	serverConfigs = customServerConfigs(serverConfigs, paths);

	// //////////////////////////////////
	// ///// Client Webpack Configs /////
	// //////////////////////////////////

	const baseClientWebpackOptions = {
		...paths,
		configs: {
			...clientConfigs,
			mode: development ? 'development' : ('production' as any),
		},
	};

	// Get default webpack configs
	let clientWebpackConfigs = defaultClientWebpackConfigs(
		{},
		baseClientWebpackOptions
	);

	// Import the file
	let customClientWebpackConfigs = require(paths.clientWebpackConfigPath);
	customClientWebpackConfigs =
		customClientWebpackConfigs.default || customClientWebpackConfigs;

	// Use these configs
	clientWebpackConfigs = customClientWebpackConfigs(
		clientWebpackConfigs,
		baseClientWebpackOptions
	);

	// //////////////////////////////////
	// ///// Server Webpack Configs /////
	// //////////////////////////////////

	const baseServerWebpackOptions = {
		...paths,
		configs: {
			...serverConfigs,
			mode: development ? 'development' : ('production' as any),
		},
	};

	// Get default webpack configs
	let serverWebpackConfigs = defaultServerWebpackConfigs(
		{},
		baseServerWebpackOptions
	);

	// Import the file
	let customServerWebpackConfigs = require(paths.serverWebpackConfigPath);
	customServerWebpackConfigs =
		customServerWebpackConfigs.default || customServerWebpackConfigs;

	// Use these configs
	serverWebpackConfigs = customServerWebpackConfigs(
		serverWebpackConfigs,
		baseServerWebpackOptions
	);

	//////////////////
	///// Return /////
	//////////////////

	return {
		...paths,
		clientConfigs,
		clientWebpackConfigs,
		serverConfigs,
		serverWebpackConfigs,
	};
}
