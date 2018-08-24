import semver from 'semver';
import { Utils } from '@blueeast/bluerain-cli-core/lib';
import { expoVersions } from './expoVersions';
import fs from 'fs';

/**
 * Check the version of expo installed in package.json and return the relevant
 * sdk version to use in app.json
 */
export const getSdk = () => {

	// const Package = await import(Utils.fromProjectRoot('package.json'));

	const Package = fs.readFileSync(Utils.fromProjectRoot('node_modules/expo/package.json'));

	let expoVersion = JSON.parse(Package.toString()).version;
	if (!expoVersion) {
		throw Error('⛔️ Expo is not installed.');
	}

	const sdk = expoVersions.find(expoVerObj => semver.satisfies(expoVersion, expoVerObj.expo))

	// const major = semver.major(semver.coerce(expoVersion));

	// const sdk = expoVersions.find(ver => major === ver.id);

	if (!sdk) {
		throw Error('⛔️ Unsupported expo version.');
	}

	return sdk.sdkVersion;
}
