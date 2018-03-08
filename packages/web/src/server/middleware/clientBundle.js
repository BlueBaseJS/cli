import express from 'express';
import { resolve as pathResolve } from 'path';
import config from '../../config';

/**
 * Middleware to server our client bundle.
 */
export default express.static(
  pathResolve(config('projectRootDir'), config('bundles.client.outputPath')),
  {
    maxAge: config('browserCacheMaxAge'),
  },
);
