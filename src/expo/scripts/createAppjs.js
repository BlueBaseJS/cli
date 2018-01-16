const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');

/**
 * Generates a boot.js file on run time.
 */
function generateBootFile() {
	shell.echo(chalk.blue('Generating App.js'));
	let data = fs.readFileSync(path.join(__dirname, '../../templates/App.js'));
	data = data.toString();
	data = data.replace('BOOT_PATH',  './expo/boot.js');
	fs.writeFileSync(path.join(process.cwd(), 'App.js'), data);
}

module.exports = generateBootFile;
