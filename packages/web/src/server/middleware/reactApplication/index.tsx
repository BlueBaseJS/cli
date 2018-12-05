import { Request, Response } from 'express';
import { ServerConfigsBundle } from '../../server';
import withSSR from './withSSR';
import withoutSSR from './withoutSSR';

/**
 * React application middleware, supports server side rendering.
 */
export default (configs: ServerConfigsBundle) =>
	(req: Request, res: Response) =>
	(configs.server.disableSSR)
		? withoutSSR(req, res, configs)
		: withSSR(req, res, configs);
