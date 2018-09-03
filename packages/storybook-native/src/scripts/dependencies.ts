import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@blueeast/bluerain-cli-expo';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [
	...coreDeps,
];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'@blueeast/bluerain-storybook-addon',
	'@storybook/addon-actions',
	'@storybook/addon-links',
	'@storybook/react-native',
	'react-native-storybook-loader',
];
