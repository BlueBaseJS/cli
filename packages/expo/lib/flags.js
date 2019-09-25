"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpoFlagDefs = void 0;

var _command = require("@oclif/command");

const ExpoFlagDefs = {
  configDir: _command.flags.string({
    default: './bluebase/expo',
    description: 'Path to config directory relative to the root directory',
    env: 'CONFIG_DIR',
    hidden: false,
    multiple: false,
    required: false
  }),
  buildDir: _command.flags.string({
    default: './build/expo',
    description: 'Path to build directory relative to the root directory',
    env: 'BUILD_DIR',
    hidden: false,
    multiple: false,
    required: false
  }),
  assetsDir: _command.flags.string({
    default: './assets/expo',
    description: 'Path to assets directory relative to the root directory',
    env: 'ASSETS_DIR',
    hidden: false,
    multiple: false,
    required: false
  }),
  appJsPath: _command.flags.string({
    default: './bluebase/expo/App',
    description: 'Path to App.js file relative to the root directory',
    env: 'APP_JS_PATH',
    hidden: false,
    multiple: false,
    required: false
  })
}; // export default class Expo extends Command {
// 	static description = 'Brings BlueBase projects to expo platform';
// 	static examples = [
// 		`$ bluebase expo start`,
// 	];
// 	async run() {
// 		// const { args, flags } = this.parse(Expo);
// 	}
// }

exports.ExpoFlagDefs = ExpoFlagDefs;