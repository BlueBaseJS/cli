import { resolve as pathResolve } from 'path';
import express from 'express';

/**
 * Middleware to server our client bundle.
 */
export default (config: ((name: string) => any)) => express.static(
  pathResolve(config('projectRootDir'), config('bundles.client.outputPath')),
	{
		maxAge: config('browserCacheMaxAge'),
	},
);
