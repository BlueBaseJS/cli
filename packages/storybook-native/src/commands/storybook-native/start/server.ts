import { ExpoFlagDefs, ExpoFlags } from '../../../expo';
import { exec, execSync } from 'child_process';
import { Command } from '@oclif/command';
import { Utils } from '@blueeast/bluerain-cli-core';

export default class CustomCommand extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluerain expo:start`,
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
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '🖥 Launching Storybook Native Server',
		});

		execSync(
			Utils.fromProjectRoot('./node_modules/.bin/rnstl'),
			{ env: process.env, stdio: 'inherit' }
		);

		exec(
			`${Utils.fromProjectRoot('./node_modules/.bin/storybook')} start --config-dir ${Utils.fromProjectRoot(configDir, 'storybook')} -p 7007`,
			{ env: process.env },
			(err, stdout, stderr) => {
				if (err) {
					// node couldn't execute the command
					return;
				}

				// the *entire* stdout and stderr (buffered)
				this.log(`stdout: ${stdout}`);
				this.log(`stderr: ${stderr}`);
			}
		);

		return;
	}
}