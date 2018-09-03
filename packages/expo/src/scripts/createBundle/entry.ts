import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { getConfigFiles } from '../../';
import fromRoot from '../fromRoot';
import path from 'path';

export interface CreateBundleInterface {
	assetsDir: string,
	buildDir: string,
	configDir: string,
	name: string,
}

export const createBundle = async ({ assetsDir, buildDir, configDir, name }: CreateBundleInterface) => {

	/////////////////////////////
	///// Setup FileManager /////
	/////////////////////////////

	// Set config files
	const configFiles = getConfigFiles(configDir);
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
