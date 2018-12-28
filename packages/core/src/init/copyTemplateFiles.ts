import { Utils } from '..';
import fs from 'fs';
import shell from 'shelljs';

/**
 * Global initializer.
 *
 * - Create a bluebase/common folder
 * - Add tsconfig and tslint files
 */
export const copyTemplateFiles = async (assetsDir: string, configDir: string) => {

	// Copy common configs
	await Utils.copyTemplateFiles(
		Utils.fromCore('templates/common'),
		Utils.fromProjectRoot(configDir, '..', 'common'),
		{ prompt: false }
	);

	// Copy common asset files
	await Utils.copyTemplateFiles(
		Utils.fromCore('templates/assets'),
		Utils.fromProjectRoot(assetsDir, '..', 'common'),
		{ prompt: false }
	);

	// src folder
	await Utils.copyTemplateFiles(
		Utils.fromCore('templates/src'),
		Utils.fromProjectRoot('src'),
		{ prompt: false }
	);

	// Copy tsconfig
	const tsconfigPath = Utils.fromProjectRoot('tsconfig.json');
	if (!fs.existsSync(tsconfigPath)) {
		shell.cp('-rf',
			Utils.fromCore('templates/tsconfig.json'),
			Utils.fromProjectRoot()
		);
	}

	// Copy tslint file & install blueeast configs
	const tslintPath = Utils.fromProjectRoot('tslint.json');
	if (!fs.existsSync(tslintPath)) {
		shell.cp('-rf',
			Utils.fromCore('templates/tslint.json'),
			Utils.fromProjectRoot()
		);
	}
};