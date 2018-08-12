import { ConfigsBundle } from '.';
// import { Server } from 'http';
import { Utils } from '@blueeast/bluerain-cli-core';
import { spawn } from 'child_process';
// import server from '../../server';

const logger = Utils.logger;

class HotNodeServer {

	private server: any;
	private serverCompiling: any;
	private clientCompiling: any;
	private disposing: any;
	private watcher: any;

	constructor(name: string, compiler: any, clientCompiler: any, _configsBundle: ConfigsBundle) {

		const startServer = async () => {
			console.log('hmmm')
			console.log('what now?', this.server)
			if (this.server) {
				console.log('a')
				
				this.server.kill();
				console.log('b')
				this.server = null;
				logger.log({
					label: `BlueRain Server: ${name}`,
					level: 'info',
					message: 'Restarting server...',
				});
			}
			console.log('what?')

			const compiledEntryFile = Utils.fromProjectRoot(
				`${compiler.options.output.path}/${Object.keys(compiler.options.entry)[0]}`
			);
			console.log('ha!', compiledEntryFile)
			// console.log('configsBundle!', configsBundle)

			// const server = await import(compiledEntryFile);
			const newServer = spawn('node', [compiledEntryFile, '--color']);
			// console.log('4', newServer)
			// const newServer = server.default(configsBundle);

			logger.log({
				label: `BlueRain Server: ${name}`,
				level: 'info',
				message: 'Server running with latest changes.',
				notify: true,
			});

      // newServer.stdout.on('data', data => console.log(data.toString().trim()));
			newServer.on('error', (error: Error) => {
				logger.log({
					error,
					label: `BlueRain Server: ${name}`,
					level: 'error',
					message: 'Error in server execution, check the console for more info.',
				});
			});
			this.server = newServer;
		};

    // We want our node server bundles to only start after a successful client
    // build.  This avoids any issues with node server bundles depending on
    // client bundle assets.
		const waitForClientThenStartServer = () => {
			console.log('am i stuck?')
			if (this.serverCompiling) {
				console.log('1')
        // A new server bundle is building, break this loop.
				return;
			}
			if (this.clientCompiling) {
				console.log('2')
				setTimeout(waitForClientThenStartServer, 50);
				
			} else {
				console.log('3')
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
				label: `BlueRain Server: ${name}`,
				level: 'info',
				message: 'Building new bundle...',
			});
		});

		compiler.plugin('done', (stats: any) => {

			console.log('heeerree')
			this.serverCompiling = false;
			
			if (this.disposing) {
				return;
			}
			
			console.log('thereeee')
			try {
				if (stats.hasErrors()) {
					logger.log({
						error: stats,
						label: `BlueRain Server: ${name}`,
						level: 'error',
						message: 'Build failed, check the console for more information.',
						notify: true,
					});
					// tslint:disable-next-line:no-console
					console.log(stats.toString());
					// TODO: throw error here
					return;
				}

				waitForClientThenStartServer();
			} catch (err) {
				logger.log({
					error: err,
					stats,
					label: `BlueRain Server: ${name}`,
					level: 'error',
					message: 'Failed to start, please check the console for more information.',
					notify: true,
				});

				throw err;
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
			if (this.server) { this.server.kill(); }
		});
	}
}

export default HotNodeServer;
