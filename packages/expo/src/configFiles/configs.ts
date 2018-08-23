import { Constants } from 'expo';

export interface ExpoConfigs {
	manifest: Partial<Constants.Manifest>
}
export const DefaultPlatformConfigs: ExpoConfigs = {
	manifest: {
		name: "BlueRain",
		description: "This project is really great.",
		slug: "bluerain-project-expo",
		privacy: "public",
		sdkVersion: "29.0.0",
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
		entryPoint: "./build/expo/AppEntry.js"
	}
};

export default () => (DefaultPlatformConfigs);
