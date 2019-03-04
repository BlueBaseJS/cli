import { Command } from '@oclif/command';
import { FlagDefs } from '../../cli-flags';
import { Flags } from '../../types';
import { Utils } from '@bluebase/cli-core';
import { createCleanDir } from '../../helpers/createCleanDir';
import { resolveConfigsBundle } from '../../helpers/resolveConfigsBundle';
import { resolvePaths } from '../../helpers/resolvePaths';
import { spawn } from 'child_process';
import { webpackCompile } from '../../helpers/webpackCompile';
import { webpackCompileDev } from '../../helpers/webpackCompileDev';

export class StartCommand extends Command {
	static flags = FlagDefs;

	async run() {
		const label = '@bluebase/cli/web';
		const development = true;

		Utils.logger.log({
			label,
			level: 'info',
			message: '🌏 Starting BlueBase on Web...',
		});

		///////////////////////////
		///// Extract Configs /////
		///////////////////////////

		const parsed = this.parse(StartCommand);
		const flags = parsed.flags as Flags;
		const paths = resolvePaths(flags);
		const configs = resolveConfigsBundle(paths, { development });

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
			message: `👨‍💻 Compiling BlueBase's client bundle`,
		});

		webpackCompileDev(
			{
				config: configs.clientWebpackConfigs,
				host: configs.clientConfigs.devServerHost,
				port: configs.clientConfigs.devServerPort,

				on: {
					'build-finished': () => {
						if (flags.static === false) {
							// startServer(configs, '@bluebase/cli/web-server');

							webpackCompile(configs.serverWebpackConfigs).then(() => {
								spawn(
									'node',
									[Utils.fromProjectRoot(configs.buildDir, 'server/index.js')],
									{ shell: true, env: process.env, stdio: 'inherit' }
								)
									.on('close', (_code: number) => process.exit(0))
									.on('error', (spawnError: Error) =>
										Utils.logger.error(spawnError)
									);
							});
						}
					},
				},
			},
			label
		);
	}
}
