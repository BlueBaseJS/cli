import { Request, Response } from 'express';
import { PlatformConfigs } from '../../../engine';
import { Utils } from '@blueeast/bluerain-cli-core';
// tslint:disable-next-line:no-submodule-imports
import { renderToStaticMarkup } from 'react-dom/server';
// import Helmet from 'react-helmet';
// import MainApp from '../../../shared/components/DemoApp'; // Temp
import React from 'react';
import getServerHTML from './ServerHTML';

// import { StaticRouter } from 'react-router-dom';
// import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
// import asyncBootstrapper from 'react-async-bootstrapper';

// import MainApp from '../../../shared/components/MainApp';
const logger = Utils.logger;

/**
 * React application middleware, supports server side rendering.
 */
export default (configs: PlatformConfigs) => (request: Request, response: Response) => {

	const ServerHTML = getServerHTML(configs);

	// Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
	if (typeof response.locals.nonce !== 'string') {
		throw new Error('A "nonce" value has not been attached to the response');
	}
	const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
	if (configs.disableSSR) {
		if (process.env.BUILD_FLAG_IS_DEV === 'true') {
			logger.log({
				label: `BlueRain Server`,
				level: 'info',
				message: `Handling react route without SSR: ${request.url}`,
			});
		}
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
		const simpleHtml = renderToStaticMarkup(<ServerHTML nonce={nonce} />);
		response.status(200).send(`<!DOCTYPE html>${simpleHtml}`);
		return;
	}

  // Create a context for our AsyncComponentProvider.
	// const asyncComponentsContext = createAsyncContext();

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
	// const reactRouterContext = {};

  // // Declare our React application.
	// const app = (
  //   // <AsyncComponentProvider asyncContext={asyncComponentsContext}>
  //     // <StaticRouter location={request.url} context={reactRouterContext}>
  //       <MainApp />
  //     // </StaticRouter>
  //   // </AsyncComponentProvider>
  // );

  // // Pass our app into the react-async-component helper so that any async
  // // components are resolved for the render.
	// asyncBootstrapper(app).then(() => {
	// 	const appString = renderToString(app);

  //   // Generate the html response.
	// 	const html = renderToStaticMarkup(
  //     <ServerHTML
  //       reactAppString={appString}
  //       nonce={nonce}
  //       helmet={Helmet.rewind()}
  //       asyncComponentsState={asyncComponentsContext.getState()}
  //     />,
  //   );

  //   // Check if the router context contains a redirect, if so we need to set
  //   // the specific status and redirect header and end the response.
	// 	if (reactRouterContext.url) {
	// 		response.status(302).setHeader('Location', reactRouterContext.url);
	// 		response.end();
	// 		return;
	// 	}

	// 	response
  //     .status(
  //       reactRouterContext.missed
  //         ? // If the renderResult contains a "missed" match then we set a 404 code.
  //         // Our App component will handle the rendering of an Error404 view.
  //         404
  //         : // Otherwise everything is all good and we send a 200 OK status.
  //         200,
  //     )
  //     .send(`<!DOCTYPE html>${html}`);
	// });
};
