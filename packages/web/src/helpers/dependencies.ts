import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@bluebase/cli-core';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [
	...coreDeps,
	'deepmerge',
	'react-dom@^16.4.2',
	'@babel/core',
	'source-map-support',
	'@babel/runtime',
	'uuid',
	'compression',
	'metro-react-native-babel-preset'
];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'@bluebase/code-standards',
	'@types/deepmerge',
	'@types/source-map-support',
	'@types/uuid',
	'@types/compression'
];
