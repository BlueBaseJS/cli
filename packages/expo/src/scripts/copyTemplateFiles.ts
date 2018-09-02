import { Utils, copyTemplateFiles as copyCoreTemplateFiles } from '@blueeast/bluerain-cli-core';
import fromRoot from './fromRoot';

/**
 * Copy template files to project directory.
 */
export const copyTemplateFiles = async (assetsDir: string, configDir: string) => {

	await copyCoreTemplateFiles(assetsDir, configDir);

	// Copy files
	await Utils.copyAll(fromRoot('templates/expo'), Utils.fromProjectRoot(configDir));
	await Utils.copyAll(fromRoot('templates/assets'), Utils.fromProjectRoot(assetsDir));

	///// Read package.json
	Utils.mergePackageJson({
		scripts: {
			'expo:start': 'bluerain expo:start'
		}
	});
};
