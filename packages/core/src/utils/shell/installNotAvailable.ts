import { fromProjectRoot } from '../paths';
import { install } from './install';
import fs from 'fs';
import logger from '../logger';

/**
 * Takes a list of dependencies and installs only those that are
 * not already installed.
 *
 * @param dep An array of dependencies to check and install
 * @param dev Is this a dev dependency?
 */
export const installNotAvailable = (deps: string[] = [], dev: boolean = false) => {

	// Read package.json
	const pkgJsonPath = fromProjectRoot('package.json');
	const pkgJsonBuffer = fs.readFileSync(pkgJsonPath);
	const pkgJson = JSON.parse(pkgJsonBuffer.toString());

	const checkDeps = (dev === true) ? pkgJson.devDependencies : pkgJson.dependencies;

	// This will have the final list to install
	const depsToInstall: string[] = [];

	// Remove those already installed
	deps.forEach(dep => {

		// For cases like react@^16.3.1
		const name = dep.substring(0, dep.lastIndexOf('@'));

		if (!checkDeps[dep] && !checkDeps[name]) {
			depsToInstall.push(dep);
		}
	});

	// Install!
	if (depsToInstall.length > 0) {
		logger.info(`Installing missing ${dev === true ? 'dev' : ''} dependencies`, depsToInstall);
		install({ deps: depsToInstall, dev });
	}
};
