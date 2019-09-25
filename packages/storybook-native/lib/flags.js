"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
exports.ExpoFlagDefs = {
    configDir: command_1.flags.string({
        default: './bluebase/storybook-native',
        description: 'Path to config directory relative to the root directory',
        env: 'CONFIG_DIR',
        hidden: false,
        multiple: false,
        required: false,
    }),
    buildDir: command_1.flags.string({
        default: './build/storybook-native',
        description: 'Path to build directory relative to the root directory',
        env: 'BUILD_DIR',
        hidden: false,
        multiple: false,
        required: false,
    }),
    assetsDir: command_1.flags.string({
        default: './assets/storybook-native',
        description: 'Path to assets directory relative to the root directory',
        env: 'ASSETS_DIR',
        hidden: false,
        multiple: false,
        required: false,
    }),
    appJsPath: command_1.flags.string({
        default: './bluebase/storybook-native/App',
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
//# sourceMappingURL=flags.js.map