const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'app [name]';
exports.desc = 'Create a BlueRain app named [name]';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('BlueRain App creation is not implemented yet. 😞'));
	// console.log('adding app %s', argv.name);
};
