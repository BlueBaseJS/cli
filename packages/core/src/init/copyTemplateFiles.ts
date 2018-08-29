import { Utils } from '..';
import fs from 'fs';
import shell from 'shelljs';

/**
 * Global initializer.
 *
 * - Create a bluerain/common folder
 * - Add tsconfig and tslint files
 */
export const copyTemplateFiles = async (assetsDir: string, configDir: string) => {

	// Copy common configs
	await Utils.copyAll(Utils.fromCore('templates/common'), Utils.fromProjectRoot(configDir, '..', 'common'));

	// Copy common asset files
	await Utils.copyAll(Utils.fromCore('templates/assets'), Utils.fromProjectRoot(assetsDir, '..', 'common'));

	// Copy tsconfig
	const tsconfigPath = Utils.fromProjectRoot('tsconfig.json');
	if (!fs.existsSync(tsconfigPath)) {
		shell.cp('-rf', Utils.fromCore('templates/tsconfig.json'), Utils.fromProjectRoot());
	}

	// Copy tslint file & install blueeast configs
	const tslintPath = Utils.fromProjectRoot('tslint.json');
	if (!fs.existsSync(tslintPath)) {
		shell.cp('-rf', Utils.fromCore('templates/tslint.json'), Utils.fromProjectRoot());
	}
};