const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');

/**
 * Generates a boot.js file on run time.
 */
function generateBootFile() {
	shell.echo(chalk.blue('Generating boot.js'));
	let data = fs.readFileSync(path.join(__dirname, '../../templates/bootTemplate.js'));
	data = data.toString();
	data = data.replace('CONFIG_PATH', path.resolve(process.cwd(), 'bluerain.js'));
	const arr  = data.split('\n');
	arr[3] = `export default ${arr[2]}`;// export default BR.boot(bootConfig);
	arr[2] = 'bootConfig.renderApp = false;';
	arr[4] = '';
	data = arr.join('\n');
	if (!fs.existsSync(path.resolve(process.cwd(), 'expo'))) {
		shell.mkdir('-p', 'expo');
	}
	fs.writeFileSync(path.join(process.cwd(), 'expo/boot.js'), data);
}

module.exports = generateBootFile;
