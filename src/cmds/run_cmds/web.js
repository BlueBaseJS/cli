const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'web';
exports.desc = 'Run a Bluerain project on Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Running a BlueRain Web project! 🌏'));
	require('../../web/internal/scripts/run');
};
