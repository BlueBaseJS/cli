const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'web';
exports.desc = 'Build a Bluerain project for Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Building a Web project is not implemented yet. 😞'));
};
