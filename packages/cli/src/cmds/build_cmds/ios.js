const shell = require('shelljs');
const chalk = require('chalk');
const { spawn } = require('child_process');

exports.command = 'ios';
exports.desc = 'Building a Bluerain project on IOS';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building an IOS project! 🌏'));
	const command = 'node_modules/.bin/bluerain-cli-expo-build';
	spawn(command, ['ios'], { stdio: 'inherit', silent: false });
	// require('../../expo/scripts/run')(argv);
};
