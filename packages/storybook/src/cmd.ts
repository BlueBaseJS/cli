import { flags } from '@oclif/command';

export interface ExpoFlags {
	buildDir: string;
	configDir: string;
}

export const ExpoFlagDefs = {
	configDir: flags.string({
		default: './bluerain/storybook',
		description: 'Path to config directory relative to the root directory',
		env: 'CONFIG_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	buildDir: flags.string({
		default: './build/storybook',
		description: 'Path to build directory relative to the root directory',
		env: 'BUILD_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

};

// export default class Expo extends Command {
// 	static description = 'Brings BlueRain projects to expo platform';

// 	static examples = [
// 		`$ bluerain expo start`,
// 	];

// 	async run() {
// 		// const { args, flags } = this.parse(Expo);
// 	}
// }
