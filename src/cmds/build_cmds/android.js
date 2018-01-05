const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'android';
exports.desc = 'Build a Bluerain project for Android';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building an Android project! 🌏'));
	require('../../expo/scripts/build_android');
};
