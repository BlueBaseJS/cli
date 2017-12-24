const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const { exec } = require('child_process');


/**
 * Checks if project has package.json
 */
const hasPackageJson = new Promise(((resolve, reject) => {
	if (!fs.existsSync(path.resolve(process.cwd(), 'package.json') ) ) {
		return resolve(false);
	}

	return resolve(true);
}));

/**
 * Checks if package.json is present, executes "npm init" if its not.
 */
const checkPackageJson = new Promise((resolve, reject) => {

	hasPackageJson.then((result) => {

		if (result === true) {
			return resolve();
		}

		shell.echo(chalk.red('No package.json found. Executing "npm init"'));

		// npm init
		if (shell.exec('npm init').code !== 0) {
			shell.echo('Error: "npm init" failed');
			shell.exit(1);
		}

		resolve();
	});
});

module.exports = {
	checkPackageJson,
	hasPackageJson
};
