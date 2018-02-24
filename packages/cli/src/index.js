#!/usr/bin/env node
const { spawn } = require('child_process');
require('yargs') // eslint-disable-line

	// Default command to run the wizard
	.command('$0', 'Run the BlueRain wizard', () => { }, (argv) => {
		require('./src/scripts/wizard').then((answers) => {
			spawn(`bluerain ${answers.action} ${answers.type}`, { shell: true, stdio: 'inherit' });
		});
	})

	// Commands based on directories
	.commandDir('./src/cmds')
	.demandCommand()
	.help()
	.argv;
