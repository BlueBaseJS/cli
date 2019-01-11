import { Utils } from '@bluebase/cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import { buildConfigsBundle, createCleanDir, webpackCompileDev } from '../../helpers';
import { startServer } from '../../scripts/startServer';

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

		webpackCompileDev({
			config: configs.clientWebpackConfigs,
			host: configs.clientConfigs.devServerHost,
			port: configs.clientConfigs.devServerPort,

			on: {
				'build-finished': () => {

					if (flags.static === false) {
						startServer(configs, '@bluebase/cli/web-server');
					}
				}
			}
		}, label);
	}
}
