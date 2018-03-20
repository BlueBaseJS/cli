const shell = require('shelljs');
const chalk = require('chalk');
const { spawn } = require('child_process');

exports.command = 'android';
exports.desc = 'Building a Bluerain project on android';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building an Android project! 🌏'));
	const command = 'node_modules/.bin/bluerain-cli-expo-build';
	spawn(command, ['android'], { stdio: 'inherit', silent: false });
	// require('../../expo/scripts/run')(argv);
};
