import fs from 'fs';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';
import { getPathsBundle } from '../helpers/getPathsBundle';
import customClientConfigs from 'CLIENT_CONFIG';
import customServerConfigs from 'SERVER_CONFIG';
import defaultClientConfigs from '../configFiles/client.config';
import defaultServerConfigs from '../configFiles/server.config';
import { Flags } from '../types';
import express from 'express';
import logger from '@bluebase/cli-core/lib/utils/logger';
import clientBundle from './middleware/clientBundle';
import reactApplication from './middleware/reactApplication';
import security from './middleware/security';
import compression from 'compression';
import errorHandlers from './middleware/errorHandlers';

///////////////////////////
///// Load flags.json /////
///////////////////////////

const configsPath = fromProjectRoot('./build/web/server/flags.json');

if (!fs.existsSync(configsPath)) {
	throw new Error(
		`We could not find the "flags.json" file. Please ensure that the server bundle has been built.`,
	);
}

const flags: Flags = JSON.parse(fs.readFileSync(configsPath, 'utf8'));
console.log(flags);

////////////////////////////////
///// Build Configs Bundle /////
////////////////////////////////

// Client Configs
let clientConfigs = defaultClientConfigs({} as any, flags);
clientConfigs = customClientConfigs(clientConfigs, flags);

// Client Configs
let serverConfigs = defaultServerConfigs({} as any, flags as any);
serverConfigs = customServerConfigs(serverConfigs, flags);

///////////////////
///// Configs /////
///////////////////

const configs = { ...getPathsBundle(flags), clientConfigs, serverConfigs };

//////////////////
///// Server /////
//////////////////

// Create our express based server.
const app = express();

// Don't expose any software information to potential hackers.
app.disable('x-powered-by');

// Security middlewares.
app.use(...security(configs));

// Gzip compress the responses.
app.use(compression());

// // Register our service worker generated by our webpack config.
// // We do not want the service worker registered for development builds, and
// // additionally only want it registered if the config allows.
const serviceWorkerConfigs = configs.serverConfigs.serviceWorker;
// if (process.env.BUILD_FLAG_IS_DEV === 'false' && serviceWorkerConfigs.enabled) {
// 	app.get(`/${serviceWorkerConfigs.fileName}`, serviceWorker(configs));
// 	app.get(
// 		`${configs.clientConfigs.publicPath}${serviceWorkerConfigs.offlinePageFileName}`,
// 		offlinePage(configs),
// 	);
// }

// Configure serving of our client bundle.
if (configs.clientConfigs.publicPath) {
	app.use(configs.clientConfigs.publicPath, clientBundle(configs));
}

// Configure static serving of our "public" root http path static files.
app.use(express.static(configs.assetsDirPath));

// The React application middleware.
app.get('*', (request, response) => {
	logger.log({
		label: '@bluebase/cli/web',
		level: 'info',
		message: `Received for "${request.url}"`,
	});
	return reactApplication(configs)(request, response);
});

// Error Handler middlewares.
app.use(...errorHandlers);

// Create an http listener for our express app.
app.listen(configs.serverConfigs.port, () => {
	logger.log({
		label: '@bluebase/cli/web',
		level: 'info',
		// tslint:disable-next-line:object-literal-sort-keys
		message: `✓

		${configs.serverConfigs.welcomeMessage}

		${configs.clientConfigs.htmlPage.defaultTitle} is ready!

		with

		Service Workers: ${serviceWorkerConfigs.enabled}
		Server Side Rendering: ${!configs.serverConfigs.disableSSR}

		Server is now listening on Port ${configs.serverConfigs.port}
		You can access it in the browser at http://${configs.serverConfigs.host}:${configs.serverConfigs.port}
		Press Ctrl-C to stop.



	`,
	});
});