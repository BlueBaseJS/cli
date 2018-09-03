import { Utils } from '@blueeast/bluerain-cli-core';
import fromRoot from '../fromRoot';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';
import { getAppJson } from './getAppJson';
import { getBlueRainPath } from './getBlueRainPath';

export interface CreateBundleInterface {
	assetsDir: string,
	buildDir: string,
	configDir: string,
	name: string,
	templateVars?: any
}
export const createBundle = async ({ assetsDir, buildDir, configDir, name, templateVars }: CreateBundleInterface) => {

	debugger;

	///////////////////////////
	///// Clear build dir /////
	///////////////////////////

	// Delete dir if already exists
	if (fs.existsSync(buildDir)) {
		rimraf.sync(buildDir);
	}

	// Create a new build dir
	shell.mkdir('-p', buildDir);

	// /////////////////////
	// ///// Transpile /////
	// /////////////////////

	// shell.cp(`${fromRoot('./templates/build/tsconfig.json')}`, buildDir);
	// execSync(
	// 	`${fromRoot('node_modules/.bin/tsc')} -p ${path.join(buildDir, 'tsconfig.json')}`,
	// 	{ env: process.env, stdio: 'inherit' }
	// );

	// Utils.copyTemplateFiles(path.resolve(assetsDir, '..'), path.join(buildDir, 'assets'), { force: true });

	// // Directory where we have our transpiled config code
	// // const originalConfigDir = configDir;
	// const tranpileConfigDir = path.join(buildDir, path.relative(Utils.fromProjectRoot(), configDir));


	// /////////////////////////////
	// ///// Generate app.json /////
	// /////////////////////////////
	
	// const configFiles = getConfigFiles(tranpileConfigDir);
	// const fileManager = new FileManager(name, configFiles);
	// await fileManager.setup();

	// const configs = await fileManager.Hooks.run(`${name}.configs`, {}, { buildDir, configDir, assetsDir });
	// const appJson = { expo: configs.manifest };

	const appJson = await getAppJson({ assetsDir, buildDir, configDir, name });

	///////////////////////////
	///// Generate app.js /////
	///////////////////////////

	const bluerainJsPath = await getBlueRainPath({ configDir, name });

	///////////////////////
	///// Write files /////
	///////////////////////

	Utils.copyTemplateFiles(fromRoot('./templates/build'), buildDir, {
		force: true,
		prompt: false,
		variables: {
			'APP_JSON': JSON.stringify(appJson, null, 2),
			'BLUERAIN_JS_PATH': `./${path.relative(buildDir, bluerainJsPath)}`,
			...templateVars
		},
		writeFiles: ['App.js', 'app.json'],
	});

};
