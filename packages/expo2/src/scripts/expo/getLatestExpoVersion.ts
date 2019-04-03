import { expoVersions } from './expoVersions';

/**
 * Returns the latest version of expo
 */
export const getLatestExpoVersion = () => {
	const versions = [...expoVersions];
	versions.sort((a, b) => {
		return b.id - a.id;
	});
	return versions[0];
};
