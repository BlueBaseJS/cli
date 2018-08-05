import { NextFunction, Request, Response } from 'express';
import logger from '../../logger';

const errorHandlersMiddleware = [
  /**
   * 404 errors middleware.
   *
   * NOTE: the react application middleware hands 404 paths, but it is good to
   * have this backup for paths not handled by the react middleware. For
   * example you may bind a /api path to express.
   */
	// tslint:disable-next-line:only-arrow-functions
	function notFoundMiddlware(_req: Request, res: Response, _next: NextFunction) {
		res.status(404).send('Sorry, that resource was not found.');
	},

  /**
   * 500 errors middleware.
   *
   * NOTE: You must provide specify all 4 parameters on this callback function
   * even if they aren't used, otherwise it won't be used.
   */
	// tslint:disable-next-line:only-arrow-functions
	function unexpectedErrorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
		if (err) {
			logger.error(err);
		}
		res.status(500).send('Sorry, an unexpected error occurred.');
	},
];

export default errorHandlersMiddleware;
