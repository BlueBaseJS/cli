import { Request, Response } from 'express';
import { PlatformConfigs } from '../../../engine';
import withoutSSR from './withoutSSR';
import withSSR from './withSSR';

/**
 * React application middleware, supports server side rendering.
 */
export default (configs: PlatformConfigs) => (req: Request, res: Response) => (configs.disableSSR) ? withoutSSR(req, res, configs) : withSSR(req, res, configs);
