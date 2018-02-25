// Moved from '/src/config.js

/* eslint-disable global-require, import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import findCacheDir from 'find-cache-dir';
import { logger } from '../../common/logger';
import createDefaultWebpackConfig from './default/webpack.config';
import loadBabelConfig from '../babel';
import getBaseConfig from './getBaseConfig/webpack.config';


// `baseConfig` is a webpack configuration bundled with bluerain.
// BlueRain will look in the `configDir` directory
// (inside working directory) if a config path is not provided.
export default function(configType, configDir) {
	const config = getBaseConfig(configDir);

	const babelConfig = loadBabelConfig(configDir);
	config.module.rules[0].query = {
		// This is a feature of `babel-loader` for webpack (not Babel itself).
		// It enables a cache directory for faster-rebuilds
		// `find-cache-dir` will create the cache directory under the node_modules directory.
		cacheDirectory: findCacheDir({ name: 'react-bluerain' }),
		...babelConfig,
	};

	// //////////// BlueRain //////////////

	// Check whether bluerain.js file exists inside the bluerain.
	// Load the default bluerain.js file if it's missing.
	// Insert it after polyfills.js, but before client/client.
	const bluerainDefaultConfigsPath = path.resolve(__dirname, 'bluerain.js');
	const bluerainCustomConfigsPath = path.resolve(configDir, 'bluerain.js');
	if (fs.existsSync(bluerainCustomConfigsPath)) {
		logger.info('=> Loading custom bluerain config.');
		config.entry.client.splice(1, 0, bluerainCustomConfigsPath);
		config.resolve.alias.BLUERAIN_BOOT_CONFIG = bluerainCustomConfigsPath;
	} else {
		logger.info('=> Loading default bluerain config.');
		config.entry.client.splice(1, 0, bluerainDefaultConfigsPath);
		config.resolve.alias.BLUERAIN_BOOT_CONFIG = bluerainDefaultConfigsPath;
	}

	// //////////// BlueRain //////////////

	const defaultConfig = createDefaultWebpackConfig(config);

	// Check whether user has a custom webpack config file and
	// return the (extended) base configuration if it's not available.
	const customConfigPath = path.resolve(configDir, 'webpack.config.js');

	if (!fs.existsSync(customConfigPath)) {
		logger.info('=> Using default webpack setup based on "Create React App".');
		return defaultConfig;
	}
	const customConfig = require(customConfigPath);

	if (typeof customConfig === 'function') {
		logger.info('=> Loading custom webpack config (full-control mode).');
		return customConfig(config, configType, defaultConfig);
	}
	logger.info('=> Loading custom webpack config (extending mode).');
	return {
		...customConfig,
		// We'll always load our configurations after the custom config.
		// So, we'll always load the stuff we need.
		...config,
		// Override with custom devtool if provided
		devtool: customConfig.devtool || config.devtool,
		// We need to use our and custom plugins.
		plugins: [...config.plugins, ...(customConfig.plugins || [])],
		module: {
			...config.module,
			// We need to use our and custom rules.
			...customConfig.module,
			rules: [
				...config.module.rules,
				...((customConfig.module && customConfig.module.rules) || []),
			],
		},
		resolve: {
			...config.resolve,
			...customConfig.resolve,
			alias: {
				...config.alias,
				...(customConfig.resolve && customConfig.resolve.alias),
			},
		},
	};
}
