import { FileManager } from '@blueeast/bluerain-cli-core';
import { getDefaults, } from '@blueeast/bluerain-cli-core';

export interface CreateBundleInterface {
	configDir: string,
	name: string,
}

export const getBlueRainPath = async ({ configDir, name }: CreateBundleInterface) => {

	const defaults = getDefaults(configDir);

	const configFiles = [defaults.bluerain];

	const fileManager = new FileManager(name, configFiles);
	await fileManager.setup();

	// Path to bluerain.js file
	let bluerainJsPath = await fileManager.resolveFilePath('bluerain');

	// Remove (.ts|.js) extension
	bluerainJsPath = bluerainJsPath.replace(/\.[^/.]+$/, '');

	return bluerainJsPath;
};
