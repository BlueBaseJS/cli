import { ExpoFlagDefs, ExpoFlags } from '../../../flags';
import { execSync, spawn } from 'child_process';
import { Command } from '@oclif/command';
import { Utils } from '@bluebase/cli-core';

export default class StartServer extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluebase expo:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(StartServer);
		const flags = parsed.flags as ExpoFlags;

		// Absolute path of build dir
		const configDir = Utils.fromProjectRoot(flags.configDir);

		/////////////////////////
		///// Launch Server /////
		/////////////////////////

		Utils.logger.log({
			label: '@bluebase/cli/storybook-native',
			level: 'info',
			message: '🖥 Launching Storybook Native Server',
		});

		execSync(
			Utils.fromProjectRoot('./node_modules/.bin/rnstl'),
			{ env: process.env, stdio: 'inherit' }
		);

		return spawn(
			Utils.fromProjectRoot('./node_modules/.bin/storybook'),
			[
				'start',
				'--config-dir',
				Utils.fromProjectRoot(configDir, 'storybook'),
				'-p',
				'7007'
			],
			{ shell: true, env: process.env, cwd: Utils.fromProjectRoot(), stdio: 'inherit' }
		);
	}
}