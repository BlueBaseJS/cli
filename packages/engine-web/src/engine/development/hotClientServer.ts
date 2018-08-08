import express from 'express';
import createWebpackMiddleware from 'webpack-dev-middleware';
import createWebpackHotMiddleware from 'webpack-hot-middleware';
import ListenerManager from './listenerManager';
import logger from '../../logger';
import { createServer } from 'http';
import { ConfigsBundle } from '.';

function noop(..._params: any[]) {
	return;
}

class HotClientServer {

	webpackDevMiddleware: any;
	listenerManager: any;

	constructor(compiler: any, configs: ConfigsBundle) {
		const app = express();

    const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    const httpPath = compiler.options.output.publicPath;
    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
			throw new Error(
				'You must supply an absolute public path to a development build of a web target bundle as it will be hosted on a seperate development server to any node target bundles.',
      );
    }

		const [_, host, port] = httpPathRegex.exec(httpPath) as any;
		noop(_, host);

    this.webpackDevMiddleware = createWebpackMiddleware(compiler, {
			// quiet: true,
      // noInfo: true,
      headers: {
				'Access-Control-Allow-Origin': `http://${configs.host}:${configs.port}`,
      },
      // Ensure that the public path is taken from the compiler webpack config
      // as it will have been created as an absolute path to avoid conflicts
      // with an node servers.
      publicPath: compiler.options.output.publicPath,
    });

    app.use(this.webpackDevMiddleware);
    app.use(createWebpackHotMiddleware(compiler));

		const server = createServer(app);
		const listener = server.listen(port);

    this.listenerManager = new ListenerManager(listener, 'client');

    compiler.plugin('compile', () => {
			logger.log({
				title: 'client',
				level: 'info',
				message: 'Building new bundle...',
			});
    });

    compiler.plugin('done', (stats: any) => {
      if (stats.hasErrors()) {
				logger.log({
					title: 'client',
					level: 'error',
					message: 'Build failed, please check the console for more information.',
					notify: true,
				});
      } else {
				logger.log({
					title: 'client',
					level: 'info',
					message: 'Running with latest changes.',
					notify: true,
				});
      }
    });
  }

  dispose() {
    this.webpackDevMiddleware.close();

    return this.listenerManager ? this.listenerManager.dispose() : Promise.resolve();
  }
}

export default HotClientServer;
