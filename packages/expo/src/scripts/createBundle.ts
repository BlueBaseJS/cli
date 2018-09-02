import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { execSync } from 'child_process';
import { getConfigFiles } from '..';
import fromRoot from './fromRoot';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';

export interface CreateBundleInterface {
	assetsDir: string,
	buildDir: string,
	configDir: string,
	name: string,
}
export const createBundle = async ({ assetsDir, buildDir, configDir, name }: CreateBundleInterface) => {

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
	// This really does feel hacky and dirty, explore webpack
	/////////////////////

	execSync(`${fromRoot('node_modules/.bin/tsc')}`, { env: process.env, stdio: 'inherit' });
	shell.cp('-rf', `${Utils.fromProjectRoot('dist')}/*`, buildDir);

	Utils.copyTemplateFiles(path.resolve(assetsDir, '..'), path.join(buildDir, 'assets'), { force: true });

	// Directory where we have our transpiled config code
	// const originalConfigDir = configDir;
	const tranpileConfigDir = path.join(buildDir, path.relative(Utils.fromProjectRoot(), configDir));

	/////////////////////////////
	///// Setup FileManager /////
	/////////////////////////////

	// Set config files
	const configFiles = getConfigFiles(tranpileConfigDir);
	const fileManager = new FileManager(name, configFiles);
	await fileManager.setup();

	/////////////////////////////
	///// Generate app.json /////
	/////////////////////////////

	const configs = await fileManager.Hooks.run(`${name}.configs`, {}, { buildDir, configDir, assetsDir });
	const appJson = { expo: configs.manifest };

	///////////////////////////
	///// Generate app.js /////
	///////////////////////////

	// Path to bluerain.js file
	let blueeastJsPath = await fileManager.resolveFilePath('bluerain');

	// Remove (.ts|.js) extension
	blueeastJsPath = blueeastJsPath.replace(/\.[^/.]+$/, '');

	///////////////////////
	///// Write files /////
	///////////////////////

	Utils.copyTemplateFiles(fromRoot('./templates/build'), buildDir, {
		force: true,
		prompt: false,
		variables: {
			'APP_JSON': JSON.stringify(appJson, null, 2),
			'BLUERAIN_JS_PATH': `./${path.relative(buildDir, blueeastJsPath)}`,
		},
		writeFiles: ['App.js', 'app.json'],
	});

};
