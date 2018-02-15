const {
	spawn
} = require('child_process');
const fs = require('fs');
const path = require('path');
const createAppJson = require('../createAppJson');
const createAppJs = require('./createAppjs');
const createBoot = require('./createBoot');
const exp = require('./expo_cli')();

const isExistAppJS = fs.existsSync(path.resolve(process.cwd(), './App.js'));

module.exports = function(argv) {

	if ((argv && argv.entry) && isExistAppJS) {
		createAppJson(argv.entry);
	} else if ((argv && argv.entry) && !isExistAppJS) {
		throw new Error('Please create App.js');
	} else {
		createAppJson();
		createAppJs();
		createBoot();
	}

	// spawn('exp', ['start', path.resolve( __dirname, '../../../')], { shell: true, stdio: 'inherit' });
	const execCommand = `${exp} start   `;
	spawn(execCommand, {
		shell: true,
		stdio: 'inherit'
	});
};
