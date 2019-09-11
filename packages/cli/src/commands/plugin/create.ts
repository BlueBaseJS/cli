// import { ExpoFlagDefs, ExpoFlags } from '../../flags';
import { requiredDependencies, requiredDevDependencies } from '../../scripts/dependencies';

import { Command } from '@oclif/command';
import { Utils } from '@bluebase/cli-core';
// import fromRoot from '../../scripts/fromRoot';
import inquirer from 'inquirer';

// tslint:disable: no-var-requires
const gitclone = require('gitclone');
const { execSync } = require('child_process');

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
			message: '📂 Creating Plugin Boilerplate directory...',
		});

		// clones with SSH
		await new Promise((resolve) => {
			gitclone('BlueBaseJS/plugin-boilerplate', true, resolve);
		});

		// Copy file and add template variables
		await Utils.copyTemplateFiles(
			Utils.fromProjectRoot('./plugin-boilerplate'),
			Utils.fromProjectRoot(answers.GIT_REPO),
			{
				force: true,
				prompt: false,
				variables: answers,
				writeFiles: ['package.json', 'README.md', 'src/index.ts', 'src/__tests__/index.test.ts'],
			}
		);

		// Delete original folder
		execSync(`rm -rf plugin-boilerplate`);

		// Change working directory
		process.chdir(Utils.fromProjectRoot(answers.GIT_REPO));

		// Delete .git dir
		execSync(`rm -rf .git`);

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
			message: '✅ Done! BlueBase Plugin Boilerplate initialized.',
		});

	}
}

