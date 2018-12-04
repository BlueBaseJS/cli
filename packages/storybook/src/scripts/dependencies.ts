import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@blueeast/bluerain-cli-core';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [
	...coreDeps,
	'deepmerge',
];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'@blueeast/bluerain-cli-essentials',
	'@blueeast/bluerain-storybook-addon',
	'@storybook/addon-actions',
	'@storybook/addon-links',
	'@storybook/react',
	'@types/deepmerge',
	'babel-core@^6.26.3'
];