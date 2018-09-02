import { ExpoFlagDefs, ExpoFlags } from '../../expo';
import { Command } from '@oclif/command';
import { Utils } from '@blueeast/bluerain-cli-core';
import { createBundle } from '../../scripts';
import { spawn } from 'child_process';
import fromRoot from '../../scripts/fromRoot';
import path from 'path';

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
			name: 'expo',
		});

		///////////////////////
		///// Launch expo /////
		///////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🚀 Launching Expo',
		});

		const appJsonPath = path.join(buildDir, 'app.json');
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