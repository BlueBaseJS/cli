const shell = require('shelljs');
const chalk = require('chalk');
const server = require('@blueeast/bluerain-cli-web').default;

exports.command = 'web';
exports.desc = 'Build a Bluerain project for Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building a BlueRain Web project! 🌏'));
	server.build();
};
