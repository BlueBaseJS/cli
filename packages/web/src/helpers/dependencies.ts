import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@bluebase/cli-core';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [
	...coreDeps,
	'deepmerge',
	'react-dom@^16.4.2',
	'@babel/core',
	'@babel/runtime',
	'metro-react-native-babel-preset'
];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'@types/workbox-webpack-plugin@3.6.1',
	'workbox-webpack-plugin@4.0.0',
	'@bluebase/code-standards',
	'@types/deepmerge',
];
