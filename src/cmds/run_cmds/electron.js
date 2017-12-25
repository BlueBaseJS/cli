const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'electron';
exports.desc = 'Run a Bluerain project on Electron';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Running an Electron project is not implemented yet. 😞'));
};
