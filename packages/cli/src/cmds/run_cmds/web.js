const shell = require('shelljs');
const chalk = require('chalk');
const server = require('@blueeast/bluerain-cli-web').default;

exports.command = 'web';
exports.desc = 'Run a Bluerain project on Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Running a BlueRain Web project! 🌏'));
	server.run();
};
