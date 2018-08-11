import { PlatformConfigs } from '../../engine';
import { Utils } from '@blueeast/bluerain-cli-core';
import express from 'express';

/**
 * Middleware to server our client bundle.
 */
export default (configs: PlatformConfigs) => express.static(
	Utils.fromProjectRoot(configs.bundles.client.outputPath),
	{
		maxAge: configs.browserCacheMaxAge,
	},
);
