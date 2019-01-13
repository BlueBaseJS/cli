import { NextFunction, Request, Response } from 'express';
import { ConfigsBundle1 } from '../../helpers/buildConfigsBundle.1';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths/fromProjectRoot';

// Middleware to serve our service worker.
const serviceWorkerMiddleware =
	(configs: ConfigsBundle1)  =>
	(_req: Request, res: Response, _next: NextFunction) => {
		res.sendFile(
			fromProjectRoot(
				`./${configs.clientConfigs.outputPath}/${configs.serverConfigs.serviceWorker.fileName}`
			),
		);
	};

export default serviceWorkerMiddleware;
