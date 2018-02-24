const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'linux';
exports.desc = 'Build a Bluerain project for Linux';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building an Linux project! 🌏'));
	// require('../../electron/scripts/build_linux');
};
