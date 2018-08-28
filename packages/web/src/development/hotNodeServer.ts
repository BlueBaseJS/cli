// import { ConfigsBundle } from '.';
// // import { Server } from 'http';
// import { Utils } from '@blueeast/bluerain-cli-core';
// import { spawn } from 'child_process';
// // import server from '../../server';

// const logger = Utils.logger;

// class HotNodeServer {

// 	private server: any;
// 	private serverCompiling: any;
// 	private clientCompiling: any;
// 	private disposing: any;
// 	private watcher: any;

// 	constructor(name: string, compiler: any, clientCompiler: any, _configsBundle: ConfigsBundle) {

// 		const startServer = async () => {
// 			if (this.server) {
// 				this.server.kill();
// 				this.server = null;
// 				logger.log({
// 					label: `@bluerain/cli/server: ${name}`,
// 					level: 'info',
// 					message: 'Restarting server...',
// 				});
// 			}

// 			const compiledEntryFile = Utils.fromProjectRoot(
// 				`${compiler.options.output.path}/${Object.keys(compiler.options.entry)[0]}`
// 			);

// 			// const server = await import(compiledEntryFile);
// 			const newServer = spawn('node', [compiledEntryFile, '--color']);
// 			// const newServer = server.default(configsBundle);

// 			logger.log({
// 				label: `@bluerain/cli/server: ${name}`,
// 				level: 'info',
// 				message: 'Server running with latest changes.',
// 				notify: true,
// 			});


// 			newServer.stdout.on('data', data => console.log(data.toString().trim()));
// 			newServer.stderr.on('data', (data) => {
// 				logger.log({
// 					label: `@bluerain/cli/server: ${name}`,
// 					level: 'error',
// 					message: 'Error in server execution, check the console for more info.',
// 				});
// 				console.error(data.toString().trim());
// 			});


//       // newServer.stdout.on('data', data => console.log(data.toString().trim()));
// 			// newServer.on('error', (error: Error) => {
// 			// 	logger.log({
// 			// 		error,
// 			// 		label: `@bluerain/cli/server: ${name}`,
// 			// 		level: 'error',
// 			// 		message: 'Error in server execution, check the console for more info.',
// 			// 	});
// 			// });
// 			this.server = newServer;
// 		};

//     // We want our node server bundles to only start after a successful client
//     // build.  This avoids any issues with node server bundles depending on
//     // client bundle assets.
// 		const waitForClientThenStartServer = () => {
// 			if (this.serverCompiling) {
//         // A new server bundle is building, break this loop.
// 				return;
// 			}
// 			if (this.clientCompiling) {
// 				setTimeout(waitForClientThenStartServer, 50);
				
// 			} else {
// 				startServer();
// 			}
// 		};

// 		clientCompiler.plugin('compile', () => {
// 			this.clientCompiling = true;
// 		});

// 		clientCompiler.plugin('done', (stats: any) => {
// 			if (!stats.hasErrors()) {
// 				this.clientCompiling = false;
// 			}
// 		});

// 		compiler.plugin('compile', () => {
// 			this.serverCompiling = true;
// 			logger.log({
// 				label: `@bluerain/cli/server: ${name}`,
// 				level: 'info',
// 				message: 'Building new bundle...',
// 			});
// 		});

// 		compiler.plugin('done', (stats: any) => {

// 			this.serverCompiling = false;
			
// 			if (this.disposing) {
// 				return;
// 			}
			
// 			try {
// 				if (stats.hasErrors()) {
// 					logger.log({
// 						error: stats,
// 						label: `@bluerain/cli/server: ${name}`,
// 						level: 'error',
// 						message: 'Build failed, check the console for more information.',
// 						notify: true,
// 					});
// 					// tslint:disable-next-line:no-console
// 					console.log(stats.toString());
// 					// TODO: throw error here
// 					return;
// 				}

// 				waitForClientThenStartServer();
// 			} catch (err) {
// 				logger.log({
// 					error: err,
// 					stats,
// 					label: `@bluerain/cli/server: ${name}`,
// 					level: 'error',
// 					message: 'Failed to start, please check the console for more information.',
// 					notify: true,
// 				});

// 				throw err;
// 			}
// 		});

//     // Lets start the compiler.
// 		this.watcher = compiler.watch(null, () => undefined);
// 	}

// 	dispose() {
// 		this.disposing = true;

// 		const stopWatcher = new Promise((resolve) => {
// 			this.watcher.close(resolve);
// 		});

// 		return stopWatcher.then(() => {
// 			if (this.server) { this.server.kill(); }
// 		});
// 	}
// }

// export default HotNodeServer;
