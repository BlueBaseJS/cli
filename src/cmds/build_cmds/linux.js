const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'linux';
exports.desc = 'Build a Bluerain project for Linux';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Building a Linux project is not implemented yet. 😞'));
};
