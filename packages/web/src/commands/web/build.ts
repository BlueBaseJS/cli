import { Utils } from '@bluebase/cli-core';
import { FlagDefs } from '../../cli-flags';
import { Command } from '@oclif/command';
import { Flags } from '../../types';
import { resolvePaths } from '../../helpers/resolvePaths';
import { resolveConfigsBundle } from '../../helpers/resolveConfigsBundle';
import { createCleanDir } from '../../helpers/createCleanDir';
import { webpackCompile } from '../../helpers/webpackCompile';


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

		const paths = resolvePaths(flags);
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