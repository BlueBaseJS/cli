const shell = require('shelljs');
const chalk = require('chalk');

exports.command = 'macos';
exports.desc = 'Build a Bluerain project for macOS';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building an mac project! 🌏'));
	// require('../../electron/scripts/build_mac');
};
