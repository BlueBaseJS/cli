import { flags } from '@oclif/command';

export const FlagDefs = {
	configDir: flags.string({
		default: './bluebase/web',
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
		default: './bluebase/web/App',
		description: 'Path to App.js file relative to the root directory',
		env: 'APP_JS_PATH',
		hidden: false,
		multiple: false,
		required: false,
	}),

	webpackClientConfigPath: flags.string({
		default: './bluebase/web/client-webpack-config.ts',
		description: 'Path to webpackClientConfigPath file relative to the root directory',
		env: 'WEBPACK_CLIENT_CONFIG_PATH',
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
