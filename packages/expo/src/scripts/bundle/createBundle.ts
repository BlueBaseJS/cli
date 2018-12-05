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
	appJsPath: string,
	name: string,
	templateVars?: any
}
export const createBundle = async ({
	assetsDir, buildDir, configDir, appJsPath, name, templateVars
}: CreateBundleInterface) => {

	///////////////////////////
	///// Clear build dir /////
	///////////////////////////

	// Delete dir if already exists
	if (fs.existsSync(buildDir)) {
		rimraf.sync(buildDir);
	}

	// Create a new build dir
	shell.mkdir('-p', buildDir);

	// /////////////////////////////
	// ///// Generate app.json /////
	// /////////////////////////////

	const appJson = await getAppJson({ assetsDir, buildDir, configDir, name });

	///////////////////////////
	///// Generate app.js /////
	///////////////////////////

	const bluerainJsPath = await getBlueRainPath({ configDir, name });

	// Checks if Custom App.js exists in configDir
	let appJsLocation = 'App';
	if (fs.existsSync(appJsPath + '.js')) {
		appJsLocation = path.relative(buildDir, appJsPath);
	}

	///////////////////////
	///// Write files /////
	///////////////////////

	await Utils.copyTemplateFiles(fromRoot('./templates/build'), buildDir, {
		force: true,
		prompt: false,
		variables: {
			'APP_JSON': JSON.stringify(appJson, null, 2),
			'APP_JS_PATH': `./${appJsLocation}`,
			'BLUERAIN_JS_PATH': `./${path.relative(buildDir, bluerainJsPath)}`,
			...templateVars
		},
		writeFiles: ['App.js', 'app.json', 'AppEntry.js'],
	});

};
