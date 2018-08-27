import { ChildProcess, spawn } from 'child_process';
import { HotDevelopmentOptions } from '.';
import { Utils } from '@blueeast/bluerain-cli-core';
import webpack from 'webpack';

export class HotNodeServer {

	public clientCompiling = false;
	private serverCompiling = false;
	private disposing = false;

	private server?: ChildProcess | null;
	private watcher?: webpack.Compiler.Watching;

	constructor(public configs: HotDevelopmentOptions) {}

	public start = () => {

		this.configs.clientCompiler.plugin('compile', () => {
			this.clientCompiling = true;
		});

		this.configs.clientCompiler.plugin('done', (stats: any) => {
			if (!stats.hasErrors()) {
				this.clientCompiling = false;
			}
		});

		this.configs.serverCompiler.plugin('compile', () => {
			this.serverCompiling = true;
			Utils.logger.log({
				label: `BlueRain Server`,
				level: 'info',
				message: 'Building new bundle...',
			});
		});

		this.configs.serverCompiler.plugin('done', (stats: any) => {

			console.log(stats.toString());

			this.serverCompiling = false;
			
			console.log('------here')
			if (this.disposing) {
				return;
			}

			try {
				console.log('------ 111')
				if (stats.hasErrors()) {
					Utils.logger.log({
						error: stats,
						label: `BlueRain Server`,
						level: 'error',
						message: 'Build failed, check the console for more information.',
						notify: true,
					});
					// tslint:disable-next-line:no-console
					// console.log(stats.toString());
					// TODO: throw error here
					return;
				}
				console.log('------ 222')

				this.waitForClientThenStartServer();
			} catch (err) {
				Utils.logger.log({
					error: err,
					stats,
					label: `BlueRain Server`,
					level: 'error',
					message: 'Failed to start, please check the console for more information.',
					notify: true,
				});

				throw err;
			}
		});

		// Lets start the compiler.
		this.watcher = this.configs.serverCompiler.watch({}, () => { return; });
	}

	public dispose = () => {
		this.disposing = true;

		const stopWatcher = new Promise((resolve) => this.watcher ? this.watcher.close(resolve) : resolve());

		return stopWatcher.then(() => {
			if (this.server) { this.server.kill(); }
		});
	}

	private startServer = async () => {
		if (this.server) {
			this.server.kill();
			this.server = null;
			Utils.logger.log({
				label: `BlueRain Server`,
				level: 'info',
				message: 'Restarting server...',
			});
		}

		const outputPath = this.configs.serverCompiler.options.output && this.configs.serverCompiler.options.output.path;
		const entry = this.configs.serverCompiler.options.entry || [];

		const compiledEntryFile = Utils.fromProjectRoot(`${outputPath}/${Object.keys(entry)[0]}`);

		// const server = await import(compiledEntryFile);
		const newServer = spawn('node', [compiledEntryFile, '--color']);
		// const newServer = server.default(configsBundle);

		Utils.logger.log({
			label: `BlueRain Server`,
			level: 'info',
			message: 'Server running with latest changes.',
			notify: true,
		});


		newServer.stdout.on('data', data => console.log(data.toString().trim()));
		newServer.stderr.on('data', (data) => {
			Utils.logger.log({
				label: `BlueRain Server`,
				level: 'error',
				message: 'Error in server execution, check the console for more info.',
			});
			console.error(data.toString().trim());
		});


		// newServer.stdout.on('data', data => console.log(data.toString().trim()));
		// newServer.on('error', (error: Error) => {
		// 	Utils.logger.log({
		// 		error,
		// 		label: `BlueRain Server`,
		// 		level: 'error',
		// 		message: 'Error in server execution, check the console for more info.',
		// 	});
		// });
		this.server = newServer;
	}


	// We want our node server bundles to only start after a successful client
	// build.  This avoids any issues with node server bundles depending on
	// client bundle assets.
	private waitForClientThenStartServer = () => {
		if (this.serverCompiling) {
			// A new server bundle is building, break this loop.
			return;
		}
		if (this.clientCompiling) {
			setTimeout(this.waitForClientThenStartServer, 50);

		} else {
			this.startServer();
		}
	}

}