import { NextFunction, Request, Response } from 'express';
import { PlatformConfigs } from '../../engine';
import { Utils } from '@blueeast/bluerain-cli-core';

// Middleware to serve our service worker.
const serviceWorkerMiddleware =
	(configs: PlatformConfigs)  =>
	(_req: Request, res: Response, _next: NextFunction) => {
		res.sendFile(
			Utils.fromProjectRoot(
				`./${configs.bundles.client.outputPath}/${configs.serviceWorker.fileName}`
			),
		);
	};

export default serviceWorkerMiddleware;
