import { HotDevelopmentOptions } from '.';
import { Server } from 'http';
import { Utils } from '@bluebase/cli-core';
import { server } from '../../server';

export class HotNodeServer {

	public clientCompiling: 'NOT-STARTED' | 'COMPILING' | 'DONE' = 'NOT-STARTED';

	private server?: Server | null;
	// tslint:disable-next-line
	constructor(public configs: HotDevelopmentOptions) {}

	public start = () => {

		this.configs.clientCompiler.hooks.compile.tap('HotHodeServer', () => {
			this.clientCompiling = 'COMPILING';
		});

		this.configs.clientCompiler.hooks.done.tap('HotHodeServer', (stats: any) => {
			if (!stats.hasErrors()) {
				this.clientCompiling = 'DONE';
			}
		});

		this.waitForClientThenStartServer();
	}

	public dispose = async () => {
		if (this.server) { this.server.close(); }
	}

	private startServer = async () => {
		if (this.server) {
			this.server.close();
			this.server = null;
			Utils.logger.log({
				label: `@bluebase/cli/server`,
				level: 'info',
				message: 'Restarting server...',
			});
		}

		const newServer = server({
			assetsDirPath: this.configs.assetsDirPath,
			client: this.configs.clientConfigs,
			server: this.configs.serverConfigs,
		});

		newServer.on('listening', () => {
			Utils.logger.log({
				label: `@bluebase/cli/server`,
				level: 'info',
				message: 'Server running with latest changes.',
				notify: true,
			});
		});

		newServer.on('error', (err: Error) => {
			Utils.logger.log({
				err,
				label: `@bluebase/cli/server`,
				level: 'error',
				message: 'Error in server execution, check the console for more info.',
			});
		});

		this.server = newServer;
	}


	// We want our node server bundles to only start after a successful client
	// build.  This avoids any issues with node server bundles depending on
	// client bundle assets.
	private waitForClientThenStartServer = () => {
		if (this.clientCompiling !== 'DONE') {
			setTimeout(this.waitForClientThenStartServer, 50);
		} else {
			this.startServer();
		}
	}

}