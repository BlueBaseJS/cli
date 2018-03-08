/* eslint-disable no-unused-vars */

import { resolve as pathResolve } from 'path';
import config from '../../config';

// Middleware to serve our service worker.
function serviceWorkerMiddleware(req, res, next) {
  res.sendFile(
    pathResolve(
      config('projectRootDir'),
      config('bundles.client.outputPath'),
      config('serviceWorker.fileName'),
    ),
  );
}

export default serviceWorkerMiddleware;
