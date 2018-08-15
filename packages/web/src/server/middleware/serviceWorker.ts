import { NextFunction, Request, Response } from 'express';
import { Utils } from '@blueeast/bluerain-cli-core';
import { PlatformConfigs } from '../../internal/configFiles';

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
