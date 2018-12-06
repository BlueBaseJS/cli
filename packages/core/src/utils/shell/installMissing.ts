import { fromProjectRoot } from '../paths';
import { install } from './install';
import fs from 'fs';

/**
 * Takes a list of dependencies and installs only those that are
 * not already installed.
 *
 * @param dep An array of dependencies to check and install
 * @param dev Is this a dev dependency?
 */
export const installMissing = (deps: string[] = [], dev: boolean = false) => {

	// Read package.json
	const pkgJsonPath = fromProjectRoot('package.json');

	let pkgJson: { [key: string]: any } = {};

	// Delete dir if already exists
	if (fs.existsSync(pkgJsonPath)) {
		const pkgJsonBuffer = fs.readFileSync(pkgJsonPath);
		pkgJson = JSON.parse(pkgJsonBuffer.toString());
	}

	pkgJson = { dependencies: {}, devDependencies: {}, ...pkgJson };
	const checkDeps: { [key: string]: string } = dev === true ? pkgJson.devDependencies : pkgJson.dependencies;

	// This will have the final list to install
	const depsToInstall: string[] = [];

	// Remove those already installed
	if (checkDeps) {
		deps.forEach(dep => {

			// For cases like react@^16.3.1
			const name = dep.substring(0, dep.lastIndexOf('@'));

			if (!checkDeps[dep] && !checkDeps[name]) {
				depsToInstall.push(dep);
			}
		});
	}

	// Install!
	if (depsToInstall.length > 0) {
		install({ deps: depsToInstall, dev });
	}
};
