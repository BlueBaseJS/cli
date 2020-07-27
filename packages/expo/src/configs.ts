import { ExpoFlags } from './flags';
import { Utils } from '@bluebase/cli-core';
import path from 'path';

export interface ExpoConfigs {
	manifest: any; // Partial<Constants.Manifest>
}

export default (input: any, paths: ExpoFlags): ExpoConfigs => {
	return {
		...input,

		manifest: {
			android: {
				package: 'com.bluebase.app',
			},
			description: 'This project is really great.',
			entryPoint: path.relative(
				Utils.fromProjectRoot(),
				path.join(paths.buildDir, 'AppEntry.js')
			),
			icon: path.relative(
				Utils.fromProjectRoot(),
				path.join(paths.assetsDir, './icon.png')
			),
			ios: {
				bundleIdentifier: 'com.bluebase.app',
				supportsTablet: true,
			},
			name: 'BlueBase',
			orientation: 'portrait',
			platforms: ['ios', 'android', 'web'],
			privacy: 'public',
			slug: 'bluebase-project-expo',
			splash: {
				backgroundColor: '#ffffff',
				image: path.relative(
					Utils.fromProjectRoot(),
					path.join(paths.assetsDir, './splash.png')
				),
				resizeMode: 'contain',
			},
			version: '1.0.0',
		},
	};
};
