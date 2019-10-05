import { ExpoFlagDefs, ExpoFlags } from '../../flags';

import { Command } from '@oclif/command';
import { Utils } from '@bluebase/cli-core';
import { createBundle } from '../../scripts';

export default class ExpoBuild extends Command {
	static description = 'creates a expo build directory with app.json file';

	static examples = [`$ bluebase expo:build`];

	static flags = ExpoFlagDefs;
	// static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(ExpoBuild);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '🏗 Building android project...',
		});

		// run expo:ios build script
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);
		const assetsDir = Utils.fromProjectRoot(flags.assetsDir);
		const appJsPath = Utils.fromProjectRoot(flags.appJsPath);

		/////////////////////////////
		///// Transpile & Build /////
		/////////////////////////////

		// const transiplePath = path.join(buildDir, 'dist');
		await createBundle({
			appJsPath,
			assetsDir,
			buildDir,
			configDir,
			name: 'expo',
		});

		return;
	}
}
