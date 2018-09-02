import { fromProjectRoot } from '../paths';
import deepmerge from 'deepmerge';
import fs from 'fs';

/**
 * Takes an object, and merges it into the package.json
 * file of the porcess root.
 * @param pkg
 */
export const mergePackageJson = (pkg: object) => {

	const pkgJsonPath = fromProjectRoot('package.json');
	const pkgJsonBuffer = fs.readFileSync(pkgJsonPath);
	const pkgJson = JSON.parse(pkgJsonBuffer.toString());

	const newPkg = deepmerge(pkgJson, pkg);

	// Update package.json
	fs.writeFileSync(pkgJsonPath, JSON.stringify(newPkg, null, 2));
};
