#!/usr/bin/env node
const shell = require('shelljs');

require('yargs') // eslint-disable-line

	// Default command to run the wizard
	.command('$0', 'Run the BlueRain wizard', () => {}, (argv) => {
		require('./src/scripts/wizard').then((answers) => {
			shell.exec(`bluerain ${answers.action} ${answers.type}`);
		});
	})

	// Commands based on directories
	.commandDir('./src/cmds')
	.demandCommand()
	.help()
	.argv;
