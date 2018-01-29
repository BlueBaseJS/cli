const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');

/**
 * Generates a boot.js file on run time.
 */
function generateBootFile(command) {
	shell.echo(chalk.blue('Generating boot.js'));
	let data = fs.readFileSync(path.join(__dirname, '../templates/boot.js'));
	data = data.toString();
	// setting bluerain.js path to the boot file
	data = data.replace('CONFIG_PATH', path.resolve(process.cwd(), 'bluerain.js'));
	if (command === 'build.web') {
		// uncommenting // require('./web/registerServiceWorker'); line only for web build
		// because service workers are only required in web production build
		data = data.replace('// require', 'require');
		data = data.replace('//require', 'require');
	}
	fs.writeFileSync(path.join(__dirname, '../boot.js'), data);
}

module.exports = generateBootFile;
