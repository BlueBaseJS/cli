const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'ios';
exports.desc = 'Build a Bluerain project for iOS';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('Building an iOS project is not implemented yet. 😞'));
};
