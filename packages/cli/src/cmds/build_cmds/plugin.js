const shell = require('shelljs');
const chalk = require('chalk');
const { spawn } = require('child_process');
module.exports = {
	command: 'plugin',
	desc: 'Build a BlueRain Plugin for babel 🔌',
	builder: {},
	handler(argv) {
		const args = [];
		shell.echo(chalk.blue('Building a BlueRain Plugin! 🔌'));
		const execCommand = 'node_modules/.bin/bluerain-cli-build-plugin';

		// we can't check by simply if(argv.tsc)
		// we have to compare strictly with false
		// in order to avoid undefined case.
		if (argv.tsc === false) {
			args.push('--no-tsc');
		}
		spawn(execCommand, args, { shell: true, stdio: 'inherit' });
	}
};
