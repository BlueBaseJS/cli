import { Utils, copyTemplateFiles as copyCoreTemplateFiles } from '@blueeast/bluerain-cli-core';
import fromRoot from './fromRoot';
import fs from 'fs';

/**
 * Copy template files to project directory.
 */
export const copyTemplateFiles = async (assetsDir: string, configDir: string) => {

	await copyCoreTemplateFiles(assetsDir, configDir);

	// Copy files
	await Utils.copyAll(fromRoot('templates/expo'), Utils.fromProjectRoot(configDir));
	await Utils.copyAll(fromRoot('templates/assets'), Utils.fromProjectRoot(assetsDir));

	///// Read package.json
	const pkgJsonPath = Utils.fromProjectRoot('package.json');
	const pkgJsonBuffer = fs.readFileSync(pkgJsonPath);
	const pkgJson = JSON.parse(pkgJsonBuffer.toString());

	// Modify package.json
	if (!pkgJson.scripts) {
		pkgJson.scripts = {};
	}

	pkgJson.scripts['expo:start'] = 'bluerain expo:start';

	// Update package.json
	fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
};
