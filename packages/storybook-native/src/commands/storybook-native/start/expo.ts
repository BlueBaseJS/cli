import { ExpoFlagDefs, ExpoFlags } from '../../../expo';
import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { checkReactNativeTransformer, getConfigFiles } from '@blueeast/bluerain-cli-expo';
import { Command } from '@oclif/command';
import { execSync } from 'child_process';
import fromRoot from '../../../scripts/fromRoot';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';

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
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '🏗 Building Expo project...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);

		///////////////////////////////////
		///// Check Required Packages /////
		///////////////////////////////////

		await checkReactNativeTransformer();

		/////////////////////////////
		///// Setup FileManager /////
		/////////////////////////////

		// Set config files
		const configFiles = getConfigFiles(flags.configDir);
		const fileManager = new FileManager('storybook-native', configFiles);
		await fileManager.setup();

		///////////////////////////
		///// Clear build dir /////
		///////////////////////////

		// Delete dir if already exists
		if (fs.existsSync(buildDir)) {
			rimraf.sync(buildDir);
		}

		// Create a new build dir
		shell.mkdir('-p', buildDir);

		/////////////////////////////
		///// Generate app.json /////
		/////////////////////////////

		const configs = await fileManager.Hooks.run(`storybook-native.configs`, {}, { buildDir, configDir: flags.configDir });
		const appJson = { expo: configs.manifest };
		const appJsonPath = path.join(buildDir, 'app.json');

		fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

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

		execSync(
			`${fromRoot('./node_modules/.bin/expo')} start --config ${Utils.fromProjectRoot(appJsonPath)}`,
			{ env: process.env, stdio: 'inherit' }
		);

		return;
	}
}