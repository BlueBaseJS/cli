import { Constants } from 'expo';
import path from 'path';
import { ExpoFlags } from '../commands/expo';

export interface ExpoConfigs {
	manifest: Partial<Constants.Manifest>
}

export default (input: any, paths: ExpoFlags): ExpoConfigs => {

	return {
		...input,

		manifest: {
			name: "BlueRain",
			description: "This project is really great.",
			slug: "bluerain-project-expo",
			privacy: "public",
			// sdkVersion: "28.0.0",
			sdkVersion: "UNVERSIONED",
			platforms: ["ios", "android"],
			version: "1.0.0",
			orientation: "portrait",
			icon: "./assets/icon.png",
			splash: {
				image: "./assets/splash.png",
				resizeMode: "contain",
				backgroundColor: "#ffffff"
			},
			ios: {
				supportsTablet: true
			},
			entryPoint: path.join(paths.buildDir, 'AppEntry.js'),

			packagerOpts: {
				sourceExts: [
					"ts",
					"tsx"
				],
				transformer: path.join('node_modules', '@blueeast/bluerain-cli', 'node_modules', '@blueeast/bluerain-cli-expo', 'react-native-typescript-transformer', 'index.js')
			},
		}
	};
};
