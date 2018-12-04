import { Constants } from 'expo';
import { ExpoFlags } from './flags';
import { getExpoSdk } from './scripts/expo/getExpoSdk';
import path from 'path';
import { Utils } from '@blueeast/bluerain-cli-core/lib';

export interface ExpoConfigs {
	manifest: Partial<Constants.Manifest>
}

export default (input: any, paths: ExpoFlags): ExpoConfigs => {

	return {
		...input,

		manifest: {
			description: 'This project is really great.',
			entryPoint: path.relative(Utils.fromProjectRoot(), path.join(paths.buildDir, 'AppEntry.js')),
			icon: path.relative(Utils.fromProjectRoot(), path.join(paths.assetsDir, './icon.png')),
			ios: {
				supportsTablet: true,
				bundleIdentifier: 'com.bluerain.app'
			},
			android: {
				package: 'com.bluerain.app'
			},
			name: 'BlueRain',
			orientation: 'portrait',
			packagerOpts: {
				sourceExts: [
					'ts',
					'tsx'
				],
				transformer: path.join('node_modules', 'react-native-typescript-transformer', 'index.js')
			},
			platforms: ['ios', 'android'],
			privacy: 'public',
			sdkVersion: getExpoSdk(),
			slug: 'bluerain-project-expo',
			splash: {
				backgroundColor: '#ffffff',
				image: path.relative(Utils.fromProjectRoot(), path.join(paths.assetsDir, './splash.png')),
				resizeMode: 'contain',
			},
			version: '1.0.0',
		}
	};
};