const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'windows';
exports.desc = 'Build a Bluerain project for Windows';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building an windows project! 🌏'));
	require('../../electron/scripts/build_windows');
};
