import { Command } from '@oclif/command';
import { ExpoFlagDefs } from '../../expo';
import { Utils } from '@blueeast/bluerain-cli-core';
import { spawn } from 'child_process';

export default class CustomCommand extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluerain storybook-native:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {

		const bluerainPath = Utils.fromProjectRoot('./node_modules/.bin/bluerain');

		const p1 = spawn(
			bluerainPath,
			['storybook-native:start:server'],
			{ shell: true, env: process.env, stdio: 'inherit' }
		)
			.on('close', (_code: number) => {

				spawn(
					bluerainPath,
					['storybook-native:start:expo'],
					{ shell: true, env: process.env, stdio: 'inherit' }
				)
					.on('close', () => {
						p1.kill();
						process.exit(0);
					})
					.on('error', (spawnError: Error) => Utils.logger.error(spawnError));
			})
			.on('error', (spawnError: Error) => Utils.logger.error(spawnError));

		// const p2 = spawn(
		// 	bluerainPath,
		// 	['storybook-native:start:expo'],
		// 	{ shell: true, env: process.env, stdio: 'inherit' }
		// )
		// 	.on('close', (_code: number) => {
		// 		console.log('closing, p2')
		// 		p1.kill();
		// 		process.exit(0);
		// 	})
		// 	.on('error', (spawnError: Error) => Utils.logger.error(spawnError));

		return;
	}
}