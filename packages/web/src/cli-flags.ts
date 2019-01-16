import { flags } from '@oclif/command';

export const FlagDefs = {
	configDir: flags.string({
		default: './bluebase/web',
		description: 'Path to config directory relative to the project root directory',
		env: 'CONFIG_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	buildDir: flags.string({
		default: './build/web',
		description: 'Path to build directory relative to the project root directory',
		env: 'BUILD_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	assetsDir: flags.string({
		default: './assets/web',
		description: 'Path to assets directory relative to the project root directory',
		env: 'ASSETS_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	static: flags.boolean({
		default: false,
		description: 'Create a static project.',
		env: 'STATIC',
		hidden: false,
		required: false,
	}),

};
