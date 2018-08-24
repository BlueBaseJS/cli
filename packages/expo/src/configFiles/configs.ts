import { Constants } from 'expo';
import { ExpoFlags } from '../expo';
import { getSdk } from '../scripts/getExpoSdk';
import path from 'path';

export interface ExpoConfigs {
	manifest: Partial<Constants.Manifest>
}

export default (input: any, paths: ExpoFlags): ExpoConfigs => {

	return {
		...input,

		manifest: {
			description: 'This project is really great.',
			entryPoint: path.join(paths.buildDir, 'AppEntry.js'),
			icon: path.join(paths.configDir, './assets/icon.png'),
			ios: {
				supportsTablet: true
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
			sdkVersion: getSdk(),
			slug: 'bluerain-project-expo',
			splash: {
				backgroundColor: '#ffffff',
				image: path.join(paths.configDir, './assets/splash.png'),
				resizeMode: 'contain',
			},
			version: '1.0.0',
		}
	};
};
