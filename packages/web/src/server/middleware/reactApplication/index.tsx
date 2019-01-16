import { Request, Response } from 'express';
import { ConfigsBundle } from '../../types';
import withSSR from './withSSR';
import withoutSSR from './withoutSSR';

/**
 * React application middleware, supports server side rendering.
 */
export default (configs: ConfigsBundle) =>
	(req: Request, res: Response) =>
		configs.serverConfigs.disableSSR
			? withoutSSR(req, res, configs)
			: withSSR(req, res, configs);
