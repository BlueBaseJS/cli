import { ExpoFlagDefs, ExpoFlags } from '../../../expo';
import { Command } from '@oclif/command';
import { Utils } from '@blueeast/bluerain-cli-core';
import { createBundle } from '@blueeast/bluerain-cli-expo';
import { execSync } from 'child_process';
import fromRoot from '../../../scripts/fromRoot';
import fs from 'fs';
import path from 'path';

export default class CustomCommand extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluerain expo:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🏗 Building project...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);
		const assetsDir = Utils.fromProjectRoot(flags.assetsDir);

		/////////////////////////////
		///// Transpile & Build /////
		/////////////////////////////

		// const transiplePath = path.join(buildDir, 'dist');
		await createBundle({
			assetsDir,
			buildDir,
			configDir,
			name: 'storybook-native',
		});

		////////////////////////////////
		///// Generate AppEntry.js /////
		////////////////////////////////

		// Where do we save this file?
		const appJsPath = path.join(buildDir, 'AppEntry.js');

		// Inject bluerain.js path in template
		let data = fs.readFileSync(fromRoot('./templates/AppEntry.js')).toString();
		data = data.replace('STORYBOOK_APP_PATH', path.relative(buildDir, path.join(configDir, 'storybook/')));

		// Save file
		fs.writeFileSync(appJsPath, data);

		///////////////////////
		///// Launch expo /////
		///////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '🚀 Launching Storybook Native',
		});

		const appJsonPath = path.join(buildDir, 'app.json');
		execSync(
			`${fromRoot('./node_modules/.bin/expo')} start --config ${Utils.fromProjectRoot(appJsonPath)}`,
			{ env: process.env, stdio: 'inherit' }
		);

		return;
	}
}