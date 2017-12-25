const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'android';
exports.desc = 'Build a Bluerain project for Android';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Building an Android project is not implemented yet. 😞'));
};
