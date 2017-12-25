const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'plugin [name]';
exports.desc = 'Create a BlueRain plugin named [name]';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('BlueRain Plugin initializing is not implemented yet. 😞'));
	// console.log('adding plugin %s', argv.name);
};
