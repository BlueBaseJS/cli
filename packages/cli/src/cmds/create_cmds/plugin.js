const shell = require('shelljs');
const chalk = require('chalk');
const gitHubCloner = require('../../web/internal/scripts/create');

function handler(name) {
	// Creating Project
	shell.echo(chalk.green('Creating plugin....'));
	// Url of the repositery to be clonned.
	const projectUrl = 'https://github.com/BlueEastCode/bluerain-boilerplate-plugin.git';
	/**
	 * gitHubCloner expect and object of url and project name.
	 * By Default project name is 'bluerain-boilerplate'.
	 * It return an object having single method executeCommand.
	 * executeCommand expect list of commands supported by gitHubCloner
	 * you can pass callback, that would be last parameter of gitHubCloner.
	 * Supported commands are 'CREATE_DIR', 'CD', 'GIT_CLONE', 'RUN'.
	 * If you don't provide any command in executeCommand It will invoke
	 * all of the commands.
	 */

	const stub = gitHubCloner({ url: projectUrl, name, type: 'Plugin' });
	stub.executeCommand((msg) => {
		console.log(chalk.green(msg));
	});

}

exports.command = 'plugin [name]';
exports.desc = 'Create a BlueRain plugin named [name]';
exports.builder = {};
exports.handler = function(argv) {
	// if (argv && argv.name) {
	// 	handler(argv.name);
	// } else {
	// 	require('../../scripts/name_wizard')('Plugin').then((name) => {
	// 		handler(name);
	// 	});
	// }
};
