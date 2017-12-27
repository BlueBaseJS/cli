const path = require('path');
const shell = require('shelljs');
const fs = require('fs');
function updatePackageJson() {
	const packageJSON = require(path.join(process.cwd(), './package.json'));
	packageJSON.main = 'build';
	const content = JSON.stringify(packageJSON, null, 2);
	shell.mkdir('-p', 'electron');
	fs.writeFile(path.join(process.cwd(), 'electron/package.json'), content, 'utf8', (err) => {
		if (err) {
			return console.log(err);
		}
	});
}
module.exports = updatePackageJson;
