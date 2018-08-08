import logger from '../../logger';
import { ConfigsBundle } from '.';
// import server from '../../server';
import { Server } from 'http';
import { Utils } from '@blueeast/bluerain-cli-core';

class HotNodeServer {

	private server: Server | null = null;
	private serverCompiling: any;
	private clientCompiling: any;
	private disposing: any;
	private watcher: any;

  constructor(name: string, compiler: any, clientCompiler: any, configsBundle: ConfigsBundle) {

		const startServer = () => {
			if (this.server) {
				this.server.close();
        this.server = null;
				logger.log({
					title: name,
					level: 'info',
					message: 'Restarting server...',
				});
      }

			const compiledEntryFile = Utils.fromProjectRoot(`${compiler.options.output.path}/${Object.keys(compiler.options.entry)[0]}`);
			const server = require(compiledEntryFile).default;
			// const newServer = spawn('node', [compiledEntryFile, '--color']);
			const newServer = server(configsBundle);

			logger.log({
				title: name,
				level: 'info',
				message: 'Server running with latest changes.',
				notify: true,
			});;

      // newServer.stdout.on('data', data => console.log(data.toString().trim()));
      newServer.on('error', (error: Error) => {
				logger.log({
					title: name,
					level: 'error',
					error,
					message: 'Error in server execution, check the console for more info.',
				});
      });
      this.server = newServer;
    };

    // We want our node server bundles to only start after a successful client
    // build.  This avoids any issues with node server bundles depending on
    // client bundle assets.
    const waitForClientThenStartServer = () => {
      if (this.serverCompiling) {
        // A new server bundle is building, break this loop.
        return;
      }
      if (this.clientCompiling) {
        setTimeout(waitForClientThenStartServer, 50);
      } else {
        startServer();
      }
    };

    clientCompiler.plugin('compile', () => {
      this.clientCompiling = true;
    });

    clientCompiler.plugin('done', (stats: any) => {
      if (!stats.hasErrors()) {
        this.clientCompiling = false;
      }
    });

    compiler.plugin('compile', () => {
      this.serverCompiling = true;
			logger.log({
				title: name,
				level: 'info',
				message: 'Building new bundle...',
			});
    });

    compiler.plugin('done', (stats: any) => {
      this.serverCompiling = false;

      if (this.disposing) {
        return;
      }

      try {
        if (stats.hasErrors()) {
					logger.log({
						title: name,
						level: 'error',
						message: 'Build failed, check the console for more information.',
						notify: true,
					})
					console.log(stats.toString());
          return;
        }

        waitForClientThenStartServer();
      } catch (err) {
				logger.log({
					title: name,
					level: 'error',
					message: 'Failed to start, please check the console for more information.',
					notify: true,
				});
			}
    });

    // Lets start the compiler.
    this.watcher = compiler.watch(null, () => undefined);
  }

  dispose() {
    this.disposing = true;

    const stopWatcher = new Promise((resolve) => {
      this.watcher.close(resolve);
    });

    return stopWatcher.then(() => {
      if (this.server) this.server.close();
    });
  }
}

export default HotNodeServer;
