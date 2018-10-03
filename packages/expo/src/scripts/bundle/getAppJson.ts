import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { execSync } from 'child_process';
import { getDefaults, } from '@blueeast/bluerain-cli-core';
import fromRoot from '../fromRoot';
import path from 'path';
// import shell from 'shelljs';
import rimraf from 'rimraf';

export interface CreateBundleInterface {
	assetsDir: string,
	buildDir: string,
	configDir: string,
	name: string,
}

export const getAppJson = async ({ assetsDir, buildDir, configDir, name }: CreateBundleInterface) => {

	const distDir = path.join(buildDir, 'dist');

	await Utils.copyTemplateFiles(fromRoot('./templates/dist'), distDir, {
		force: true,
		prompt: false,
		variables: {
			'ROOT_DIR_PATH': path.relative(distDir, Utils.fromProjectRoot()),
			'CONFIG_DIR_PATH': path.relative(distDir, configDir),
		},
		writeFiles: ['tsconfig.json'],
	});
	// shell.cp(`${fromRoot('./templates/tsconfig.json')}`, distDir);

	/////////////////////
	///// Transpile /////
	/////////////////////

	execSync(
		// tslint:disable-next-line:max-classes-per-file
		`${fromRoot('node_modules/.bin/tsc')} -p ${path.join(distDir, 'tsconfig.json')}`,
		{ env: process.env, stdio: 'inherit' }
	);

	Utils.copyTemplateFiles(path.resolve(assetsDir, '..'), path.join(distDir, 'assets'), { force: true });

	// Directory where we have our transpiled config code
	// const originalConfigDir = configDir;
	const tranpileConfigDir = path.join(distDir, path.relative(Utils.fromProjectRoot(), configDir));

	/////////////////////////////
	///// Generate app.json /////
	/////////////////////////////

	const defaults = getDefaults(tranpileConfigDir);

	const configFiles = [{
		...defaults.configs,
		defaultPath: path.join(__dirname, '../../configs')
	}];

	const fileManager = new FileManager(name, configFiles);
	await fileManager.setup();

	const configs = await fileManager.Hooks.run(`${name}.configs`, {}, { buildDir, configDir, assetsDir });
	const appJson = { expo: configs.manifest };

	// Clean  up
	rimraf.sync(distDir);

	return appJson;
};
