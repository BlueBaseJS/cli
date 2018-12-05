import { flags } from '@oclif/command';

export interface Flags {
	buildDir: string;
	configDir: string;
	assetsDir: string;
	appJsPath: string;
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

	assetsDir: flags.string({
		default: './assets/web',
		description: 'Path to assets directory relative to the root directory',
		env: 'ASSETS_DIR',
		hidden: false,
		multiple: false,
		required: false,
	}),

	appJsPath: flags.string({
		default: './bluerain/web/App',
		description: 'Path to App.js file relative to the root directory',
		env: 'APP_JS_PATH',
		hidden: false,
		multiple: false,
		required: false,
	}),

};
