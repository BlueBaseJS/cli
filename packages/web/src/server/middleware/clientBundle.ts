import express from 'express';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';
import { ConfigsBundle } from '../types';

/**
 * Middleware to server our client bundle.
 */
export default (configs: ConfigsBundle) => express.static(
	fromProjectRoot(configs.clientConfigs.outputPath),
	{
		maxAge: configs.serverConfigs.browserCacheMaxAge,
	},
);
