import { Utils, copyTemplateFiles as copyCoreTemplateFiles } from '@bluebase/cli-core';
import { fromRoot } from './fromRoot';
import path from 'path';

/**
 * Copy template files to project directory.
 */
export const copyTemplateFiles = async (assetsDir: string, configDir: string) => {

	await copyCoreTemplateFiles(assetsDir, configDir);

	// Copy files
	await Utils.copyAll(fromRoot('templates/assets'), Utils.fromProjectRoot(assetsDir), true, false);

	await Utils.copyTemplateFiles(fromRoot('./templates/electron'), Utils.fromProjectRoot(configDir), {
		force: false,
		prompt: true,
		variables: {
			'ASSET_DIR_PATH': `./${path.relative(configDir, assetsDir)}`,
		},
		writeFiles: ['bluebase.ts'],
	});

	///// Read package.json
	Utils.mergePackageJson({
		scripts: {
			'electron:start': 'bluebase electron:start'
		}
	});
};
