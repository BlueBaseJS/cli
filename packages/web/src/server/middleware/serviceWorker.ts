import { NextFunction, Request, Response } from 'express';
import { ServerConfigsBundle } from '../server';
import { Utils } from '@bluebase/cli-core';

// Middleware to serve our service worker.
const serviceWorkerMiddleware =
	(configs: ServerConfigsBundle)  =>
	(_req: Request, res: Response, _next: NextFunction) => {
		res.sendFile(
			Utils.fromProjectRoot(
				`./${configs.client.outputPath}/${configs.server.serviceWorker.fileName}`
			),
		);
	};

export default serviceWorkerMiddleware;
