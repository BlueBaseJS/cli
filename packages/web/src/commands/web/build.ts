import { Utils } from '@bluebase/cli-core';
import { FlagDefs } from '../../cli-flags';
import { Command } from '@oclif/command';
import { createCleanDir, webpackCompile } from '../../helpers';
import { Flags } from '../../types';
import { getPathsBundle } from '../../helpers/getPathsBundle';
import { resolveConfigsBundle } from '../../helpers/resolveConfigsBundle';


export class StartStaticCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const label = '@bluebase/cli/web';
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

		const paths = getPathsBundle(flags);
		const {
			buildDir,
			clientWebpackConfigs,
		} = resolveConfigsBundle(paths, { development });

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