import { ExpoFlagDefs, ExpoFlags } from '../../../flags';
import { Command } from '@oclif/command';
import { Utils } from '@blueeast/bluerain-cli-core';
import { spawn } from 'child_process';
import { createBundle } from '../../../scripts';
import fromRoot from '../../../scripts/fromRoot';
import path from 'path';

export default class ExpoBuild extends Command {
	static description = 'creates a build for android.';

	static examples = [
		`$ bluerain expo:build:android`,
	];

	static flags = ExpoFlagDefs;
	// static flags = ExpoFlagDefs;

	async run() {

		const parsed = this.parse(ExpoBuild);
		const flags = parsed.flags as ExpoFlags;


		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🏗 Building android project...',
		});

		// run expo:ios build script
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);
		const assetsDir = Utils.fromProjectRoot(flags.assetsDir);
		const appJsonPath = path.join(buildDir, 'app.json');
		// console.log('buildDir ',buildDir);
		// console.log('appJsonPath ',appJsonPath);

		/////////////////////////////
		///// Transpile & Build /////
		/////////////////////////////

		// const transiplePath = path.join(buildDir, 'dist');
		await createBundle({
			assetsDir,
			buildDir,
			configDir,
			name: 'expo',
		});

		///////////////////////////////
		//// Expo Building Process ////
		///////////////////////////////

		const child = spawn(
			fromRoot('./node_modules/.bin/expo-cli'),
			['build:android', '--config', Utils.fromProjectRoot(appJsonPath)],
			{ shell: true, env: process.env, stdio: 'inherit' }
		)
			.on('close', (_code: number) => process.exit(0))
			.on('error', (spawnError: Error) => Utils.logger.error(spawnError));
		// Utils.fr
		process.on('SIGINT', () => {
			Utils.logger.log({
				label: '@bluerain/cli/expo',
				level: 'info',
				message: '💀 Caught interrupt signal, exiting!',
			});
			child.kill();
			process.exit();
		});

		return;
	}
}
