import { Request, Response } from 'express';
import withoutSSR from './withoutSSR';
import withSSR from './withSSR';
import { PlatformConfigs } from '../../../internal/configFiles';

/**
 * React application middleware, supports server side rendering.
 */
export default (configs: PlatformConfigs) => (req: Request, res: Response) => (configs.disableSSR) ? withoutSSR(req, res, configs) : withSSR(req, res, configs);
