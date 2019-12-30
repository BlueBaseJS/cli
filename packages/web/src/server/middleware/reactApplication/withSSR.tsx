import { Request, Response } from 'express';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import App from 'APP_JS';
import { AppRegistry } from 'react-native';
import { ConfigsBundle } from '../../types';
import React from 'react';
import getServerHTML from './ServerHTML';

// tslint:disable-next-line:no-var-requires
// const { AppRegistry } = require('react-native-web');

export default (
	_request: Request,
	response: Response,
	configs: ConfigsBundle
) => {
	const ServerHTML = getServerHTML(configs);

	// Ensure a nonce has been provided to us.
	// See the server/middleware/security.js for more info.
	if (typeof response.locals.nonce !== 'string') {
		throw new Error('A "nonce" value has not been attached to the response');
	}
	const nonce = response.locals.nonce;

	// register the app
	AppRegistry.registerComponent('App', () => App);

	// prerender the app
	const { element, getStyleElement } = AppRegistry.getApplication('App');

	// first the element
	const appString = renderToString(element);

	// then the styles (optionally include a nonce if your CSP policy requires it)
	const StyleElement = getStyleElement({ nonce });

	// Generate the html response.
	const html = renderToStaticMarkup(
		<ServerHTML
			reactAppString={appString}
			nonce={nonce}
			styleElement={StyleElement}
		/>
	);

	//   // Check if the router context contains a redirect, if so we need to set
	//   // the specific status and redirect header and end the response.
	// 	if (reactRouterContext.url) {
	// 		response.status(302).setHeader('Location', reactRouterContext.url);
	// 		response.end();
	// 		return;
	// 	}

	response
		.status(
			// reactRouterContext.missed
			//   ? // If the renderResult contains a "missed" match then we set a 404 code.
			//   // Our App component will handle the rendering of an Error404 view.
			//   404
			//   : // Otherwise everything is all good and we send a 200 OK status.
			200
		)
		.send(`<!DOCTYPE html>${html}`);
	// });
};