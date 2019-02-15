import { Utils } from '@bluebase/cli-core';
import fromRoot from '../fromRoot';
import fs from 'fs';
import { getAppJson } from './getAppJson';
import { getBlueBasePath } from './getBlueBasePath';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';

// Transpile files on the fly
// tslint:disable-next-line: no-var-requires
require('@babel/register')({
	extensions: ['.js', '.jsx', '.ts', '.tsx'],
	presets: ['babel-preset-bluebase'],
});

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

	const bluebaseJsPath = await getBlueBasePath({ configDir, name });

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
			'BLUERAIN_JS_PATH': `./${path.relative(buildDir, bluebaseJsPath)}`,
			...templateVars
		},
		writeFiles: ['App.js', 'app.json', 'AppEntry.js'],
	});

};
