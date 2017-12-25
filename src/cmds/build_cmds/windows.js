const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'windows';
exports.desc = 'Build a Bluerain project for Windows';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Building a Windows project is not implemented yet. 😞'));
};
