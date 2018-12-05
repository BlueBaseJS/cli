import { requiredDependencies as coreDeps, requiredDevDependencies as coreDevDeps } from '@blueeast/bluerain-cli-core';
import { getLatestExpoVersion } from './expo/getLatestExpoVersion';

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
	'@types/deepmerge',
	'react-native-typescript-transformer@^1.2.10',
];

const expoVersion = getLatestExpoVersion();

requiredDependencies.push(`expo@^${expoVersion.expo}`);
requiredDependencies.push(`react@^${expoVersion.react}`);
requiredDependencies.push(expoVersion.reactNative);