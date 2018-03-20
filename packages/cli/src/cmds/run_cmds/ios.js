const shell = require('shelljs');
const chalk = require('chalk');
const { execSync } = require('child_process');

exports.command = 'android';
exports.desc = 'Run a Bluerain project on android';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Running an IOS project! 🌏'));
	const command = 'node_modules/.bin/bluerain-cli-expo-run';
	execSync(command, { stdio: 'inherit', silent: false });
	// require('../../expo/scripts/run')(argv);
};
