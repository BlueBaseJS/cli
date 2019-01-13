import { Utils } from '@bluebase/cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import { buildConfigsBundle, createCleanDir, webpackCompileDev, webpackCompile } from '../../helpers';
// import { startServer } from '../../scripts/startServer';
import { spawn } from 'child_process';

export class StartCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const label = '@bluebase/cli/web';
		const development = true;

		const parsed = this.parse(StartCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label,
			level: 'info',
			message: '🌏 Starting BlueBase on Web...',
		});

		///////////////////////////
		///// Extract Configs /////
		///////////////////////////

		const configs = buildConfigsBundle(flags, { development });

		///////////////////////////
		///// Clear build dir /////
		///////////////////////////

		createCleanDir(configs.buildDir);

		/////////////////
		///// Build /////
		/////////////////

		Utils.logger.log({
			label,
			level: 'info',
			message: `👨‍💻 Compiling BlueBase's client bundle`
		});

		await webpackCompile(configs.serverWebpackConfigs);

		return;
		webpackCompileDev({
			config: configs.clientWebpackConfigs,
			host: configs.clientConfigs.devServerHost,
			port: configs.clientConfigs.devServerPort,

			on: {
				'build-finished': () => {

					if (flags.static === false) {
						// startServer(configs, '@bluebase/cli/web-server');

						spawn(
							'node',
							[Utils.fromProjectRoot(configs.buildDir, 'server/index.js')],
							{ shell: true, env: process.env, stdio: 'inherit' }
						)
							.on('close', (_code: number) => process.exit(0))
							.on('error', (spawnError: Error) => Utils.logger.error(spawnError));
							
					}
				}
			}
		}, label);
	}
}
