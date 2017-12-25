#!/usr/bin/env node
const shell = require('shelljs');

require('yargs') // eslint-disable-line
	.command('$0', 'Run the BlueRain wizard', () => {}, (argv) => {
		require('./src/scripts/wizard').then((answers) => {
			shell.exec(`bluerain ${answers.action} ${answers.type}`);
		});
	})
	.commandDir('./src/cmds')
	.demandCommand()
	.help()
	.argv;
