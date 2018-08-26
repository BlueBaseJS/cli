import { flags } from '@oclif/command';

export interface Flags {
	buildDir: string;
	configDir: string;
}

export const FlagDefs = {
	configDir: flags.string({
		default: './bluerain/web',
		description: 'Path to config directory relative to the root directory',
		env: 'CONFIG_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	buildDir: flags.string({
		default: './build/web',
		description: 'Path to build directory relative to the root directory',
		env: 'BUILD_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

};
