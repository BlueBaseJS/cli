/**
 * @deprecated
 * TODO: Remove file
 */

import { Utils } from '..';
import fs from 'fs';
import shell from 'shelljs';

const requiredDependencies = [
	'react',
	'typescript',
];

const requiredDevDependencies = [
	'@blueeast/tslint-config-blueeast',
	'@types/react',
];

/**
 * Global initializer.
 *
 * - Create a bluebase/common folder
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

	// Install dependencies
	const pkgJsonPath = Utils.fromProjectRoot('package.json');
	const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

	const depsToInstall: string[] = [];
	const devDepsToInstall: string[] = [];

	if (pkgJson.dependencies) {
		requiredDependencies.forEach(dep => {
			if (!pkgJson.dependencies[dep]) {
				depsToInstall.push(dep);
			}
		});
	}

	if (pkgJson.devDependencies) {
		requiredDevDependencies.forEach(dep => {
			if (!pkgJson.devDependencies[dep]) {
				devDepsToInstall.push(dep);
			}
		});
	}

	if (depsToInstall.length > 0) {
		Utils.install({ deps: depsToInstall, dev: false });
	}

	if (devDepsToInstall.length > 0) {
		Utils.install({ deps: devDepsToInstall, dev: true });
	}
};