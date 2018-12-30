import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@bluebase/cli-core';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [
	...coreDeps,
	'deepmerge',
	'react-dom'
];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'@types/deepmerge',
	'react-hot-loader',
	'webpack-hot-client',
];
