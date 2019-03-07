import { ConfigsBundle } from '../types';
import express from 'express';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';

/**
 * Middleware to serve our client bundle.
 */
export default (configs: ConfigsBundle) => express.static(
	fromProjectRoot(configs.clientConfigs.outputPath),
	{
		maxAge: configs.serverConfigs.browserCacheMaxAge,
	},
);
