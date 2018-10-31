import { ChildProcess } from 'child_process';
import { Command } from '@oclif/command';
import { ExpoFlagDefs } from '../../flags';
import { Utils } from '@blueeast/bluerain-cli-core';
import StartExpo from './start/expo';
import StartServer from './start/server';

export default class CustomCommand extends Command {
	static description = 'Starts or restarts a local server for your app and gives you a URL to it.';

	static examples = [
		`$ bluerain storybook-native:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {

		// const bluerainPath = Utils.fromProjectRoot('./node_modules/.bin/bluerain');

		const startServer = StartServer.run(this.argv);
		const startExpo = StartExpo.run(this.argv);

		let serverProcess: ChildProcess;
		let expoProcess: ChildProcess;

		try {

			serverProcess = await startServer;

			serverProcess
				.on('close', (_code: number) => {

					startExpo.then(p => {
						expoProcess = p;
						expoProcess.on('error', err);
					});

				}).on('error', err);

		} catch (error) {
			err(error);
		}

		process.on('SIGINT', () => {
			Utils.logger.log({
				label: '@bluerain/cli/expo',
				level: 'info',
				message: '💀 Caught interrupt signal, exiting!',
			});
			killAll();
		});

		function killAll() {

			if (serverProcess && serverProcess.kill) {
				serverProcess.kill();
			}

			if (expoProcess && expoProcess.kill) {
				expoProcess.kill();
			}
			process.exit();
		}

		function err(e: Error) {
			Utils.logger.error(e);
			killAll();
		}

		return;
	}
}