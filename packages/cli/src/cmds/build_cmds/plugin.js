const shell = require('shelljs');
const chalk = require('chalk');
module.exports = {
	command: 'plugin',
	desc: 'Build a BlueRain Plugin for babel 🔌',
	builder: {},
	handler(argv) {
		shell.echo(chalk.blue('Building a BlueRain Plugin! 🔌'));
		// require('../../plugin/build_plugin_babel');
	}
};
