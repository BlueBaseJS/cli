const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'ios';
exports.desc = 'Run a Bluerain project on iOS';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Running an iOS project is not implemented yet. 😞'));
};
