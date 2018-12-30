import { FlagDefs, Flags } from '../../cmd';
import { Command } from '@oclif/command';
import { Utils } from '@bluebase/cli-core';
import { spawn } from 'child_process';

export default class CustomCommand extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluebase storybook:start`,
	];

	static flags = FlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		// Absolute path of build dir
		const configDir = Utils.fromProjectRoot(flags.configDir);

		/////////////////////////
		///// Launch Server /////
		/////////////////////////

		Utils.logger.log({
			label: '@bluebase/cli/storybook',
			level: 'info',
			message: '🚀 Launching Storybook Server',
		});

		const child = spawn(
			Utils.fromProjectRoot('./node_modules/.bin/start-storybook'),
			['start', '--config-dir', Utils.fromProjectRoot(configDir, 'configs'), '-p', '6006'],
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