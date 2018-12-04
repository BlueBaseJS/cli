import { Utils, copyTemplateFiles as copyCoreTemplateFiles } from '@blueeast/bluerain-cli-core';
import fromRoot from './fromRoot';
import path from 'path';

/**
 * Copy template files to project directory.
 */
export const copyTemplateFiles = async (assetsDir: string, configDir: string) => {

	await copyCoreTemplateFiles(assetsDir, configDir);

	// Copy files
	await Utils.copyAll(fromRoot('templates/assets'), Utils.fromProjectRoot(assetsDir), true, false);

	await Utils.copyTemplateFiles(fromRoot('./templates/web'), Utils.fromProjectRoot(configDir), {
		force: false,
		prompt: true,
		variables: {
			'ASSET_DIR_PATH': `./${path.relative(configDir, assetsDir)}`,
		},
		writeFiles: ['bluerain.ts'],
	});

	///// Read package.json
	Utils.mergePackageJson({
		scripts: {
			'web:start': 'bluerain web:start'
		}
	});
};