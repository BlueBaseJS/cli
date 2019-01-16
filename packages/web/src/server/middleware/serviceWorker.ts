import { NextFunction, Request, Response } from 'express';
import { ConfigsBundle } from '../types';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths/fromProjectRoot';

// Middleware to serve our service worker.
const serviceWorkerMiddleware =
	(configs: ConfigsBundle)  =>
	(_req: Request, res: Response, _next: NextFunction) => {
		res.sendFile(
			fromProjectRoot(
				`./${configs.clientConfigs.outputPath}/${configs.serverConfigs.serviceWorker.fileName}`
			),
		);
	};

export default serviceWorkerMiddleware;
