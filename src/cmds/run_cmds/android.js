const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'android';
exports.desc = 'Run a Bluerain project on android';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Running an Android project! 🌏'));
	require('../../expo/scripts/run');
};
