import { NextFunction, Request, Response } from 'express';
import { resolve as pathResolve } from 'path';

// Middleware to serve our service worker.
const serviceWorkerMiddleware =
	(config: ((name: string) => any))  =>
	(_req: Request, res: Response, _next: NextFunction) => {
		res.sendFile(
			pathResolve(
				config('projectRootDir'),
				config('bundles.client.outputPath'),
				config('serviceWorker.fileName'),
			),
		);
	};

export default serviceWorkerMiddleware;
