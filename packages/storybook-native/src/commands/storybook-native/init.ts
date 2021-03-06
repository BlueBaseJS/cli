import { ExpoFlagDefs, ExpoFlags } from '../../flags';
import { requiredDependencies, requiredDevDependencies } from '../../scripts/dependencies';
import { Command } from '@oclif/command';
import { Utils } from '@bluebase/cli-core';
import { copyTemplateFiles } from '../../scripts/copyTemplateFiles';

export default class CustomCommand extends Command {
	static description = 'Initializes a directory with an example project.';

	static examples = [
		`$ bluebase storybook-native:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluebase/cli/storybook-native',
			level: 'info',
			message: '🛠 Initializing a new BlueBase + Storybook Native project...',
		});

		// Absolute path of build dir
		const configDir = Utils.fromProjectRoot(flags.configDir);
		// const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const assetsDir = Utils.fromProjectRoot(flags.assetsDir);

		// const paths = { assetsDir, buildDir, configDir };

		///////////////////////////////
		///// Copy Template Files /////
		///////////////////////////////

		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '📂 Creating Expo configuration directory...',
		});

		await copyTemplateFiles(assetsDir, configDir);

		////////////////////////////
		///// Add dependencies /////
		////////////////////////////

		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '📦 Installing dependencies...',
		});

		// Install dependencies
		Utils.installMissing(requiredDependencies, false);
		Utils.installMissing(requiredDevDependencies, true);

		// Finish
		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '✅ Done! BlueBase + Expo project initialized.',
		});

		return;
	}
}