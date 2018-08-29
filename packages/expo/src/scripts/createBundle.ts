import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { execSync } from 'child_process';
import { getConfigFiles } from '..';
import fromRoot from './fromRoot';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';

export const createBundle = async (configDir: string, buildDir: string, assetsDir: string) => {

	///////////////////////////
	///// Clear build dir /////
	///////////////////////////

	// Delete dir if already exists
	if (fs.existsSync(buildDir)) {
		rimraf.sync(buildDir);
	}

	// Create a new build dir
	shell.mkdir('-p', buildDir);

	/////////////////////
	///// Transpile /////
	/////////////////////

	execSync(`${fromRoot('node_modules/.bin/tsc')}`);
	shell.cp('-rf', `${Utils.fromProjectRoot('dist')}/*`, buildDir);

	shell.mkdir('-p', path.join(buildDir, 'assets'));
	shell.cp('-rf', `${Utils.fromProjectRoot('assets')}/*`, path.join(buildDir, 'assets'));

	// const originalConfigDir = configDir;
	const tranpileConfigDir = path.join(buildDir, path.relative(Utils.fromProjectRoot(), configDir));

	/////////////////////////////
	///// Setup FileManager /////
	/////////////////////////////

	// Set config files
	const configFiles = getConfigFiles(tranpileConfigDir);
	const fileManager = new FileManager('expo', configFiles);
	await fileManager.setup();

	/////////////////////////////
	///// Generate app.json /////
	/////////////////////////////

	Utils.logger.info(tranpileConfigDir);
	const configs = await fileManager.Hooks.run(`expo.configs`, {}, { buildDir, configDir, assetsDir });
	const appJson = { expo: configs.manifest };
	const appJsonPath = path.join(buildDir, 'app.json');

	fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

	///////////////////////////
	///// Generate app.js /////
	///////////////////////////

	// Path to bluerain.js file
	// let blueeastJsPath = await fileManager.resolveFilePath('bluerain');
	let blueeastJsPath = await fileManager.resolveWithFallback('bluerain');

	// Remove (.ts|.js) extension
	blueeastJsPath = blueeastJsPath.replace(/\.[^/.]+$/, '');

	// Where do we save this file?
	const appJsPath = path.join(buildDir, 'App.js');

	// Inject bluerain.js path in template
	let data = fs.readFileSync(fromRoot('./templates/App.js')).toString();
	data = data.replace('BLUERAIN_JS_PATH', `./${path.relative(buildDir, blueeastJsPath)}`);

	// Save file
	fs.writeFileSync(appJsPath, data);

	////////////////////////////
	///// Copy other files /////
	////////////////////////////

	// AppEntry.js
	shell.cp('-u',
		path.join(fromRoot('./templates/AppEntry.js')),
		path.join(buildDir, 'AppEntry.js')
	);
};
