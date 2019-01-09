import { Utils } from '@bluebase/cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import { buildConfigsBundle, createCleanDir, webpackCompile } from '../../helpers';


export class StartStaticCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const label = '@bluebase/cli/web-static';
		const development = false;

		const parsed = this.parse(StartStaticCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label,
			level: 'info',
			message: '🌏 Starting BlueBase Development Server...',
		});

		///////////////////////////
		///// Extract Configs /////
		///////////////////////////

		const {
			buildDir,
			clientWebpackConfigs,
		} = buildConfigsBundle(flags, { development });

		///////////////////////////
		///// Clear build dir /////
		///////////////////////////

		createCleanDir(buildDir);

		/////////////////
		///// Build /////
		/////////////////

		Utils.logger.log({
			label,
			level: 'info',
			message: '🏗 Building BlueBase web project...',
		});

		webpackCompile(clientWebpackConfigs);
	}
}