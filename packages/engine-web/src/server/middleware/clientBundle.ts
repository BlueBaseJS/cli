import express from 'express';
import { Utils } from '@blueeast/bluerain-cli-core';
import { PlatformConfigs } from '../../engine';

/**
 * Middleware to server our client bundle.
 */
export default (configs: PlatformConfigs) => express.static(
	Utils.fromProjectRoot(configs.bundles.client.outputPath),
	{
		maxAge: configs.browserCacheMaxAge,
	},
);
