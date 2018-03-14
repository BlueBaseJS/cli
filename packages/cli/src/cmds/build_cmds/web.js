const shell = require('shelljs');
const chalk = require('chalk');
const path = require('path');
const { spawn } = require('child_process');

exports.command = 'web';
exports.desc = 'Build a Bluerain project for Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Building a BlueRain Web project! 🌏'));
	// const execCommand = `babel-node ${path.resolve(__dirname, '../../', 'web/internal/scripts/build')} --optimize`;
	// spawn(execCommand, { shell: true, stdio: 'inherit' });
};
