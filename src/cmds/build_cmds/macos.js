const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'macos';
exports.desc = 'Build a Bluerain project for macOS';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Building a macOS project is not implemented yet. 😞'));
};
