import { ExpoFlagDefs, ExpoFlags } from '../../../flags';
import { Command } from '@oclif/command';
import { Utils } from '@blueeast/bluerain-cli-core';
import { createBundle } from '@blueeast/bluerain-cli-expo';
import { spawn } from 'child_process';
import fromRoot from '../../../scripts/fromRoot';
import fs from 'fs';
import path from 'path';

export default class StartExpo extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluerain expo:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(StartExpo);
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
			name: 'storybook-native',
		});

		let STORYBOOK_APP_PATH = path.relative(buildDir, path.join(configDir, 'storybook/'));

		// change STORYBOOK_APP_PATH to defined path is App.js exists in that path
		if (fs.existsSync(appJsPath + '.js')) {
			STORYBOOK_APP_PATH = path.relative(buildDir, appJsPath);
		}

		Utils.copyTemplateFiles(fromRoot('./templates/build'), buildDir, {
			force: true,
			prompt: false,
			variables: {
				STORYBOOK_APP_PATH
			},
			writeFiles: ['AppEntry.js'],
		});

		///////////////////////
		///// Launch expo /////
		///////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '🚀 Launching Storybook Native',
		});

		const appJsonPath = path.join(buildDir, 'app.json');

		return spawn(
			fromRoot('./node_modules/.bin/expo'),
			['start', '--config', Utils.fromProjectRoot(appJsonPath)],
			{ shell: true, env: process.env, cwd: Utils.fromProjectRoot(), stdio: 'inherit' }
		);

		return;
	}
}