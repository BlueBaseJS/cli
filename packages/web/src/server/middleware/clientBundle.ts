import { ConfigsBundle1 } from '../../helpers/buildConfigsBundle.1';
import express from 'express';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';

/**
 * Middleware to server our client bundle.
 */
export default (configs: ConfigsBundle1) => express.static(
	fromProjectRoot(configs.clientConfigs.outputPath),
	{
		maxAge: configs.serverConfigs.browserCacheMaxAge,
	},
);
