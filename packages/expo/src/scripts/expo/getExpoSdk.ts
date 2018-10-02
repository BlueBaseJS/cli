import { Utils } from '@blueeast/bluerain-cli-core';
import { expoVersions } from './expoVersions';
import fs from 'fs';
import semver from 'semver';

/**
 * Check the version of expo installed in package.json and return the relevant
 * sdk version to use in app.json
 */
export const getExpoSdk = () => {

	const Package = fs.readFileSync(Utils.fromProjectRoot('node_modules/expo/package.json'));

	const expoVersion = JSON.parse(Package.toString()).version;
	if (!expoVersion) {
		throw Error('⛔️ Expo is not installed.');
	}

	const sdk = expoVersions.find(expoVerObj => semver.satisfies(expoVersion, expoVerObj.expo));

	if (!sdk) {
		throw Error('⛔️ Unsupported expo version.');
	}

	return sdk.sdkVersion;
};
