import {
	Utils,
	copyTemplateFiles as copyCoreTemplateFiles,
} from '@bluebase/cli-core';

import fromRoot from '../fromRoot';
import fs from 'fs';
import slugify from 'slugify';

// tslint:disable: no-var-requires
const parseRepositoryURL = require(`@hutson/parse-repository-url`);

/**
 * Copy template files to project directory.
 */
export const copyTemplateFiles = async (
	assetsDir: string,
	configDir: string
) => {
	await copyCoreTemplateFiles(assetsDir, configDir);

	const pkg = JSON.parse(
		fs.readFileSync(Utils.fromProjectRoot('package.json'), 'utf8')
	);

	let OWNER = '';

	try {
		const repositoryURL =
			typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url;

		OWNER = parseRepositoryURL(repositoryURL).user;
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
				NAMESPACE: slugify(pkg.name, {
					remove: /[*+~.()'"!:@]/g, // regex to remove characters
					replacement: '.', // replace spaces with replacement
				}),
				OWNER,
				PROJECT_DESCRIPTION: pkg.description,
				PROJECT_NAME: pkg.name,
				SLUG: slugify(pkg.name, {
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
