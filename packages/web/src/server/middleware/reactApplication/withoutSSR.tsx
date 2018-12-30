import { Request, Response } from 'express';
import { ServerConfigsBundle } from '../../server';
import { Utils } from '@bluebase/cli-core';
// tslint:disable-next-line:no-submodule-imports
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import getServerHTML from './ServerHTML';

const logger = Utils.logger;

export default (request: Request, response: Response, configs: ServerConfigsBundle) => {

	const ServerHTML = getServerHTML(configs);

	// Ensure a nonce has been provided to us.
	// See the server/middleware/security.js for more info.
	if (typeof response.locals.nonce !== 'string') {
		throw new Error('A "nonce" value has not been attached to the response');
	}

	const nonce = response.locals.nonce;

	if (process.env.BUILD_FLAG_IS_DEV === 'true') {
		logger.log({
			label: `@bluebase/cli/server`,
			level: 'info',
			message: `Handling react route without SSR: ${request.url}`,
		});
	}

	// SSR is disabled so we will return an "empty" html page and
	// rely on the client to initialize and render the react application.
	const simpleHtml = renderToStaticMarkup(<ServerHTML nonce={nonce} />);
	response.status(200).send(`<!DOCTYPE html>${simpleHtml}`);
	return;
};
