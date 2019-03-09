import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@bluebase/cli-core';

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
	'@bluebase/cli-essentials',
	'@bluebase/storybook-addon',
	'@storybook/addon-a11y',
	'@storybook/addon-actions',
	'@storybook/addon-info',
	'@storybook/addon-knobs',
	'@storybook/addon-links',
	'@storybook/addon-viewport',
	'@storybook/react',
	'@types/deepmerge',
	'@types/storybook__addon-info',
	'@types/storybook__addon-knobs',
	// 'babel-core@^6.26.3',
	'babel-loader@^8.0.4',
];
