import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@bluebase/cli-core';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [
	...coreDeps,
	'deepmerge',
	'react-dom@^16.4.2'
];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'babel-preset-bluebase',
	'@types/deepmerge',
];
