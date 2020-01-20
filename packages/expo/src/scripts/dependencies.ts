import {
	requiredDependencies as coreDeps,
	requiredDevDependencies as coreDevDeps,
} from '@bluebase/cli-core';

import { getLatestExpoVersion } from './expo/getLatestExpoVersion';

/**
 * List of dependencies required by this plugin
 */
export const requiredDependencies = [...coreDeps, '@bluebase/code-standards'];

/**
 * List of dev dependencies required by this plugin
 */
export const requiredDevDependencies = [
	...coreDevDeps,
	'expo-cli',
	'expo-keep-awake',
	'schedule@0.4.0',
];

const expoVersion = getLatestExpoVersion();

requiredDependencies.push(`expo@${expoVersion.expo}`);
requiredDependencies.push(`react@^${expoVersion.react}`);
requiredDependencies.push(`react-native@${expoVersion.reactNativeVersion}`);
