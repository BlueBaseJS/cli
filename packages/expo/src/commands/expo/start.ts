import { Command, flags } from '@oclif/command';
import { ExpoFlagDefs, ExpoFlags } from '../../flags';

import { Utils } from '@bluebase/cli-core';
import { createBundle } from '../../scripts';
import fromRoot from '../../scripts/fromRoot';
import path from 'path';
import { spawn } from 'child_process';

export default class ExpoStart extends Command {
	static description =
		'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [`$ bluebase expo:start`];

	static flags = {
		...ExpoFlagDefs,

		'send-to': flags.string({
			char: 's',
			description: 'An email address to send a link to',
		}),

		clear: flags.boolean({
			char: 'c',
			description: 'Clear the React Native packager cache',
		}),

		'max-workers': flags.integer({
			description: 'Maximum number of tasks to allow Metro to spawn.',
		}),

		android: flags.boolean({
			char: 'a',
			description: 'Opens your app in Expo on a connected Android device',
		}),

		ios: flags.boolean({
			char: 'i',
			description:
				'Opens your app in Expo in a currently running iOS simulator on your computer',
		}),

		web: flags.boolean({
			char: 'w',
			description: 'Opens your app in a web browser',
		}),

		host: flags.enum({
			default: 'lan',
			description: 'Maximum number of tasks to allow Metro to spawn.',
			options: ['lan', 'tunnel', 'localhost'],
		}),

		tunnel: flags.boolean({
			description: 'Same as --host tunnel',
		}),

		lan: flags.boolean({
			description: 'Same as --host lan',
		}),

		localhost: flags.boolean({
			description: 'Same as --host localhost',
		}),

		dev: flags.boolean({
			description: 'Turns dev flag on',
		}),

		'no-dev': flags.boolean({
			description: 'Turns dev flag off',
		}),

		minify: flags.boolean({
			description: 'Turns minify flag on',
		}),

		'no-minify': flags.boolean({
			description: 'Turns minify flag off',
		}),

		https: flags.boolean({
			description: 'To start webpack with https protocol',
		}),

		'no-https': flags.boolean({
			description: 'To start webpack with http protocol',
		}),

		offline: flags.boolean({
			description: 'Allows this command to run while offline',
		}),
	};

	async run() {
		const parsed = this.parse(ExpoStart);
		const inputFlags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '🏗 Building project...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(inputFlags.buildDir);
		const configDir = Utils.fromProjectRoot(inputFlags.configDir);
		const assetsDir = Utils.fromProjectRoot(inputFlags.assetsDir);
		const appJsPath = Utils.fromProjectRoot(inputFlags.appJsPath);

		/////////////////////////////
		///// Transpile & Build /////
		/////////////////////////////

		// const transiplePath = path.join(buildDir, 'dist');
		await createBundle({
			appJsPath,
			assetsDir,
			buildDir,
			configDir,
			name: 'expo',
		});

		///////////////////////
		///// Launch expo /////
		///////////////////////

		Utils.logger.log({
			label: '@bluebase/cli/expo',
			level: 'info',
			message: '🚀 Launching Expo',
		});

		const appJsonPath = path.join(buildDir, 'app.json');
		const child = spawn(
			fromRoot('./node_modules/.bin/expo'),
			['start', '--config', Utils.fromProjectRoot(appJsonPath), ...this.argv],
			{ shell: true, env: process.env, stdio: 'inherit' }
		)
			.on('close', (_code: number) => process.exit(0))
			.on('error', (spawnError: Error) => Utils.logger.error(spawnError));

		process.on('SIGINT', () => {
			Utils.logger.log({
				label: '@bluebase/cli/expo',
				level: 'info',
				message: '💀 Caught interrupt signal, exiting!',
			});
			child.kill();
			process.exit();
		});

		return;
	}
}
