const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'project [name]';
exports.desc = 'Create a BlueRain project named [name]';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.red('BlueRain Project initializing is not implemented yet. 😞'));
	// console.log('adding project %s', argv.name);
};
