import { ExpoFlagDefs, ExpoFlags } from '../../expo';
import { Command } from '@oclif/command';
import { Utils } from '@blueeast/bluerain-cli-core';
import { copyTemplateFiles } from '../../scripts/copyTemplateFiles';

const requiredDependencies = [
	'deepmerge',
];

const requiredDevDependencies = [
	'@blueeast/bluerain-storybook-addon',
	'@storybook/addon-actions',
	'@storybook/addon-links',
	'@storybook/react-native',
	'@types/deepmerge',
	'react-native-storybook-loader',
	'react-native-typescript-transformer',
];

export default class CustomCommand extends Command {
	static description = 'Initializes a directory with an example project.';

	static examples = [
		`$ bluerain storybook-native:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '🛠 Initializing a new BlueRain + Storybook Native project...',
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
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '📂 Creating Expo configuration directory...',
		});

		// core
		// - copy common folder
		// - copy tsconfig + tslint
		// await coreInit(configDir, buildDir);
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