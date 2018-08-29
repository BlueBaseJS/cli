import { ExpoFlagDefs, ExpoFlags } from '../../expo';
import { Utils, init as coreInit } from '@blueeast/bluerain-cli-core';
import { requiredDependencies, requiredDevDependencies } from '../../scripts/dependencies';
import { Command } from '@oclif/command';
import { copyTemplateFiles } from '../../scripts';

export default class ExpoStart extends Command {
	static description = 'Initializes a directory with an example project.';

	static examples = [
		`$ bluerain expo:init`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(ExpoStart);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🛠 Initializing a new BlueRain + Expo project...',
		});

		// Absolute path of build dir
		const configDir = Utils.fromProjectRoot(flags.configDir);
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const assetsDir = Utils.fromProjectRoot(flags.assetsDir);

		// const paths = { assetsDir, buildDir, configDir };

		///////////////////////////////
		///// Copy Template Files /////
		///////////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '📂 Creating Expo configuration directory...',
		});

		// core
		// - copy common folder
		// - copy tsconfig + tslint
		await coreInit(configDir, buildDir);
		await copyTemplateFiles(assetsDir, configDir);

		////////////////////////////
		///// Add dependencies /////
		////////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '📦 Installing dependencies...',
		});

		// Install dependencies
		Utils.installNotAvailable(requiredDependencies, false);
		Utils.installNotAvailable(requiredDevDependencies, true);

		// Finish
		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '✅ Done! BlueRain + Expo project initialized.',
		});

		return;
	}
}


