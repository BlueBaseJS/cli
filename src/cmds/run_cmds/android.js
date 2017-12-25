const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'android';
exports.desc = 'Run a Bluerain project on android';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Running an Android project is not implemented yet. 😞'));
};
