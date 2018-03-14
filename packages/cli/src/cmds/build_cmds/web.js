const shell = require('shelljs');
const chalk = require('chalk');
const { spawn } = require('child_process');

exports.command = 'web';
exports.desc = 'Build a Bluerain project for Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building a BlueRain Web project! 🌏'));
	const execCommand = 'node_modules/.bin/bluerain-cli-web-build';
	spawn(execCommand, { shell: true, stdio: 'inherit' });
};
