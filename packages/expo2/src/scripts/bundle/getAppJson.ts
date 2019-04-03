import defaultConfigs from '../../configs';
import { findFile } from './findFile';
import path from 'path';

export interface CreateBundleInterface {
	assetsDir: string,
	buildDir: string,
	configDir: string,
	name: string,
}

export const getAppJson = async ({ assetsDir, buildDir, configDir }: CreateBundleInterface) => {

	///////////////////////////////////
  ///// Generate Client Configs /////
  ///////////////////////////////////

	const paths = { buildDir, configDir, assetsDir };

  // Get default configs
	let configs = defaultConfigs({} as any, paths as any);

	// See if there is a custom config file in the project
	const configPath = findFile(
    path.resolve(configDir, 'config.client'),
    path.resolve(__dirname, './emptyFn.js')
	);

	// Import the file
	let customConfigs = require(configPath);
	customConfigs = customConfigs.default || customConfigs;

  // Use these configs
	configs = customConfigs(configs, paths);

	/////////////////////////////
	///// Generate app.json /////
	/////////////////////////////

	const appJson = { expo: configs.manifest };

	return appJson;
};
