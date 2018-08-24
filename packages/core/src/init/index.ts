import { Utils } from '..';
import fs from 'fs';
import shell from 'shelljs';

/**
 * Global initializer.
 *
 * - Create a bluerain/common folder
 * - Add tsconfig and tslint files
 */
export default async (configDir: string, _buildDir: string) => {

	// Copy common configs
	await Utils.copyAll(Utils.fromCore('templates/common'), Utils.fromProjectRoot(configDir, '..', 'common'));

	// Copy tsconfig
	const tsconfigPath = Utils.fromCore('templates/tsconfig.json');
	if (fs.existsSync(tsconfigPath)) {
		shell.cp('-rf', tsconfigPath, Utils.fromProjectRoot());
	}

	// Copy tslint file & install blueeast configs
	const tslintPath = Utils.fromCore('templates/tslint.json');
	if (fs.existsSync(tslintPath)) {
		shell.cp('-rf', tslintPath, Utils.fromProjectRoot());
	}

	// Install deps
	const depsToInstall = [];
	const tsconfigDep = await Utils.detectInstalled('@blueeast/tslint-config-blueeast', { local: true });

	if (!tsconfigDep) {
		depsToInstall.push('@blueeast/tslint-config-blueeast');
	}

	if (depsToInstall.length > 0) {
		Utils.install({ deps: depsToInstall, dev: true });
	}
};