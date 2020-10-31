import {
	requiredDependencies as coreDeps,
	requiredDevDependencies as coreDevDeps
} from '@bluebase/cli-core';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [...coreDeps, 'deepmerge'];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'@bluebase/core',
	'@types/deepmerge',
	'react-native-typescript-transformer@^1.2.10',
	'schedule@0.4.0'
];
