// import { ExpoFlagDefs, ExpoFlags } from '../../flags';
import { requiredDependencies, requiredDevDependencies } from '../../scripts/dependencies';
import { Command } from '@oclif/command';
import { Utils } from '@bluebase/cli-core';
import fromRoot from '../../scripts/fromRoot';
import inquirer from 'inquirer';

export default class ExpoStart extends Command {
	static description = 'Creates a boilerplate for BlueBase Plugin development.';

	static examples = [
		'$ bluebase plugin:create',
	];

  // static flags = ExpoFlagDefs

	async run() {
    // const parsed = this.parse(ExpoStart)
    // const flags = parsed.flags as ExpoFlags

		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '🔌 Initializing a new BlueBase Plugin project...',
		});

		const questions = [
			{
				default: '@bluebase/plugin-untitled',
				message: 'What is the name of the project? The official naming convention is "@bluebase/plugin-*".',
				name: 'PROJECT_NAME',
				type: 'input',
			},
			{
				default: 'BlueBaseJS',
				message: 'GitHub user or organization name where the project will be published.',
				name: 'GIT_ORG',
				type: 'input',
			},
			{
				default: 'plugin-untitled',
				message: 'GitHub repo ID',
				name: 'GIT_REPO',
				type: 'input',
			},
			{
				default: 'Untitled Plugin',
				message: 'Project title. This will be added to README.md',
				name: 'PROJECT_TITLE',
				type: 'input',
			},
			{
				default: 'A BlueBase plugin boilerplate!',
				message: 'Project description.',
				name: 'PROJECT_DESCRIPTION',
				type: 'input',
			}
		];

		const prompt = inquirer.createPromptModule();

		const answers: any = await prompt(questions);

    ///////////////////////////////
    ///// Copy Template Files /////
    ///////////////////////////////

		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '📂 Creating Expo configuration directory...',
		});

		await Utils.copyTemplateFiles(fromRoot('./templates/plugin'), Utils.fromProjectRoot(), {
			force: true,
			prompt: false,
			variables: answers,
			writeFiles: ['package.json', 'README.md', 'src/index.ts', 'src/__tests__/index.test.ts'],
		});

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

	}
}

