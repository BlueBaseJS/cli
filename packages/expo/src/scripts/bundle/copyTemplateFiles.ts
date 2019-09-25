import {
	Utils,
	copyTemplateFiles as copyCoreTemplateFiles,
} from '@bluebase/cli-core';

import fromRoot from '../fromRoot';
import slugify from 'slugify';

// tslint:disable: no-var-requires
const parseRepositoryURL = require(`@hutson/parse-repository-url`);
const pkginfo = require('pkginfo')(module, 'name', 'description', 'repository');

/**
 * Copy template files to project directory.
 */
export const copyTemplateFiles = async (
	assetsDir: string,
	configDir: string
) => {
	await copyCoreTemplateFiles(assetsDir, configDir);

	// Copy files

	let OWNER = '';

	try {
		const repositoryURL =
			typeof pkginfo.repository === 'string'
				? pkginfo.repository
				: pkginfo.repository.url;

		OWNER = parseRepositoryURL(repositoryURL);
	} catch (error) {
		//
	}

	await Utils.copyTemplateFiles(
		fromRoot('templates/expo'),
		Utils.fromProjectRoot(configDir),
		{
			force: true,
			prompt: false,
			variables: {
				NAMESPACE: slugify(pkginfo.name, {
					remove: /[*+~.()'"!:@]/g, // regex to remove characters
					replacement: '.', // replace spaces with replacement
				}),
				OWNER,
				PROJECT_DESCRIPTION: pkginfo.description,
				PROJECT_NAME: pkginfo.name,
				SLUG: slugify(pkginfo.name, {
					remove: /[*+~.()'"!:@]/g, // regex to remove characters
				}),
			},
			writeFiles: ['configs.ts'],
		}
	);

	await Utils.copyAll(
		fromRoot('templates/assets'),
		Utils.fromProjectRoot(assetsDir)
	);

	///// Read package.json
	Utils.mergePackageJson({
		scripts: {
			'expo:start': 'bluebase expo:start',
		},
	});
};
