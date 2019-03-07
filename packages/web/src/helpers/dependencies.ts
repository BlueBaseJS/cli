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
	'compression'
];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'@bluebase/babel-preset-bluebase',
	'@types/deepmerge',
	'@types/source-map-support',
	'@types/uuid',
	'@types/compression'
];
