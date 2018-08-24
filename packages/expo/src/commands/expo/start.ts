import { ExpoFlagDefs, ExpoFlags } from '../../expo';
import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { Command } from '@oclif/command';
import { spawn } from 'child_process';
import checkReactNativeTransformer from '../../scripts/checkReactNativeTransformer';
import fromRoot from '../../scripts/fromRoot';
import fs from 'fs';
import getConfigFiles from '../../configFiles';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';

export default class ExpoStart extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluerain expo:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(ExpoStart);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🏗 Building project...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(flags.buildDir);

		///////////////////////////////////
		///// Check Required Packages /////
		///////////////////////////////////

		await checkReactNativeTransformer();

		/////////////////////////////
		///// Setup FileManager /////
		/////////////////////////////

		// Set config files
		const configFiles = getConfigFiles(flags.configDir);
		const fileManager = new FileManager('expo', configFiles);
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

		const configs = await fileManager.Hooks.run(`expo.configs`, {}, { buildDir, configDir: flags.configDir });
		const appJson = { expo: configs.manifest };
		const appJsonPath = path.join(buildDir, 'app.json');

		fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

		///////////////////////////
		///// Generate app.js /////
		///////////////////////////

		// Path to blueeast.js file
		let blueeastJsPath = await fileManager.resolveWithFallback('bluerain');

		// Remove (.ts|.js) extension
		blueeastJsPath = blueeastJsPath.replace(/\.[^/.]+$/, '');

		// Where do we save this file?
		const appJsPath = path.join(buildDir, 'App.js');

		// Inject bluerain.js path in template
		let data = fs.readFileSync(fromRoot('./templates/App.js')).toString();
		data = data.replace('BLUERAIN_JS_PATH', path.relative(buildDir, blueeastJsPath));

		// Save file
		fs.writeFileSync(appJsPath, data);

		////////////////////////////
		///// Copy other files /////
		////////////////////////////

		// AppEntry.js
		shell.cp('-u',
			path.join(fromRoot('./templates/AppEntry.js')),
			path.join(buildDir, 'AppEntry.js')
		);

		///////////////////////
		///// Launch expo /////
		///////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🚀 Launching Expo',
		});

		spawn(
			fromRoot('./node_modules/.bin/expo'),
			['start', '--config', Utils.fromProjectRoot(appJsonPath)],
			{ shell: true, env: process.env, stdio: 'inherit' }
		)
			.on('close', (_code: number) => process.exit(0))
			.on('error', (spawnError: Error) => Utils.logger.error(spawnError));

		return;
	}
}