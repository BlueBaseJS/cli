import { FileManager, getDefaults } from '@bluebase/cli-core';

export interface CreateBundleInterface {
	configDir: string,
	name: string,
}

export const getBlueBasePath = async ({ configDir, name }: CreateBundleInterface) => {

	const defaults = getDefaults(configDir);

	const configFiles = [defaults.bluebase];

	const fileManager = new FileManager(name, configFiles);
	await fileManager.setup();

	// Path to bluebase.js file
	let bluebaseJsPath = await fileManager.resolveFilePath('bluebase');

	// Remove (.ts|.js) extension
	bluebaseJsPath = bluebaseJsPath.replace(/\.[^/.]+$/, '');

	return bluebaseJsPath;
};
