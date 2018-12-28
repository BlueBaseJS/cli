import { ServerConfigsBundle } from '../server';
import { Utils } from '@bluebase/cli-core';
import express from 'express';

/**
 * Middleware to server our client bundle.
 */
export default (configs: ServerConfigsBundle) => express.static(
	Utils.fromProjectRoot(configs.client.outputPath),
	{
		maxAge: configs.server.browserCacheMaxAge,
	},
);
