import { ExpoFlagDefs, ExpoFlags } from '../../cmd';
import { Command } from '@oclif/command';
import { Utils } from '@blueeast/bluerain-cli-core';
import { spawn } from 'child_process';

export default class CustomCommand extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluerain storybook:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as ExpoFlags;

		// Absolute path of build dir
		const configDir = Utils.fromProjectRoot(flags.configDir);

		/////////////////////////
		///// Launch Server /////
		/////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/storybook',
			level: 'info',
			message: '🚀 Launching Storybook Server',
		});

		spawn(
			Utils.fromProjectRoot('./node_modules/.bin/start-storybook'),
			['start', '--config-dir', Utils.fromProjectRoot(configDir, 'configs'), '-p', '6006'],
			{ shell: true, env: process.env, stdio: 'inherit' }
		)
			.on('close', (_code: number) => process.exit(0))
			.on('error', (spawnError: Error) => Utils.logger.error(spawnError));

		return;
	}
}