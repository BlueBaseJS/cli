import { Utils, copyTemplateFiles as copyCoreTemplateFiles } from '@bluebase/cli-core';
import deepmerge from 'deepmerge';
import fromRoot from './fromRoot';
import fs from 'fs';
import path from 'path';
import template from 'lodash.template';

/**
 * Copy template files to project directory.
 */
export const copyTemplateFiles = async (assetsDir: string, configDir: string) => {

	await copyCoreTemplateFiles(assetsDir, configDir);

	// Copy files
	await Utils.copyAll(fromRoot('templates/storybook-native'), Utils.fromProjectRoot(configDir));
	await Utils.copyAll(fromRoot('templates/assets'), Utils.fromProjectRoot(assetsDir));

	///// Read package.json
	let pkgJson: { [key: string]: any } = {};
	const pkgJsonPath = Utils.fromProjectRoot('package.json');

	// Delete dir if already exists
	if (fs.existsSync(pkgJsonPath)) {
		const pkgJsonBuffer = fs.readFileSync(pkgJsonPath);
		pkgJson = JSON.parse(pkgJsonBuffer.toString());
	}

	// Package.json template
	const pkgTemplateBuffer = fs.readFileSync(fromRoot('templates/package.template.json'));
	const pkgTemplate = pkgTemplateBuffer.toString();

	const compiled = template(pkgTemplate);
	const pkgCompiled = compiled({ 'CONFIG_DIR_PATH': path.relative(Utils.fromProjectRoot(), configDir) });
	pkgJson = deepmerge(JSON.parse(pkgCompiled), pkgJson);

	// Update package.json
	fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
};
