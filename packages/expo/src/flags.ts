import { flags } from '@oclif/command';

export interface ExpoFlags {
	assetsDir: string;
	buildDir: string;
	configDir: string;
	appJsPath: string;
}

export const ExpoFlagDefs = {
	configDir: flags.string({
		default: './bluebase/expo',
		description: 'Path to config directory relative to the root directory',
		env: 'CONFIG_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	buildDir: flags.string({
		default: './build/expo',
		description: 'Path to build directory relative to the root directory',
		env: 'BUILD_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	assetsDir: flags.string({
		default: './assets/expo',
		description: 'Path to assets directory relative to the root directory',
		env: 'ASSETS_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	appJsPath: flags.string({
		default: './bluebase/expo/App',
		description: 'Path to App.js file relative to the root directory',
		env: 'APP_JS_PATH',
		hidden: false,
		multiple: false,
		required: false,
	}),

};

// export default class Expo extends Command {
// 	static description = 'Brings BlueBase projects to expo platform';

// 	static examples = [
// 		`$ bluebase expo start`,
// 	];

// 	async run() {
// 		// const { args, flags } = this.parse(Expo);
// 	}
// }
