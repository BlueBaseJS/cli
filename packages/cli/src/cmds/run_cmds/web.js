const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'web';
exports.desc = 'Run a Bluerain project on Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Running a BlueRain Web project! 🌏'));

	process.env.DEPLOYMENT = 'development';

	require('../../../node_modules/@blueeast/bluerain-cli-web/internal/development');
};
