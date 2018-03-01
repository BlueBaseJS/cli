const shell = require('shelljs');
const chalk = require('chalk');
const path = require('path');
const { execSync } = require('child_process');

exports.command = 'web';
exports.desc = 'Run a Bluerain project on Web';
exports.builder = {};
exports.handler = function(argv) {
	shell.echo(chalk.green('Running a BlueRain Web project! 🌏'));

	const command = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'bluerain-cli-web-develop');
	execSync(command, { stdio: 'inherit', silent: false });
};
