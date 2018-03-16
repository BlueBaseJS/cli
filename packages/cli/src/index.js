#!/usr/bin/env node
const { spawn } = require('child_process');
require('yargs') // eslint-disable-line

	// Default command to run the wizard
	.command('$0', 'Run the BlueRain wizard', () => { }, (argv) => {
		require('./wizard').then((answers) => {
			spawn(`blue ${answers.action} ${answers.type}`, { shell: true, stdio: 'inherit' });
		});
	})

	// Commands based on directories
	.commandDir('./cmds')
	.demandCommand()
	.help()
	.argv;
