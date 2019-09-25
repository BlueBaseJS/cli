"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _flags = require("../../../flags");

var _command = require("@oclif/command");

var _cliCore = require("@bluebase/cli-core");

var _scripts = require("../../../scripts");

var _fromRoot = _interopRequireDefault(require("../../../scripts/fromRoot"));

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

class ExpoBuild extends _command.Command {
  // static flags = ExpoFlagDefs;
  async run() {
    const parsed = this.parse(ExpoBuild);
    const flags = parsed.flags;

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '🏗 Building ios project...'
    }); // run expo:ios build script


    const buildDir = _cliCore.Utils.fromProjectRoot(flags.buildDir);

    const configDir = _cliCore.Utils.fromProjectRoot(flags.configDir);

    const assetsDir = _cliCore.Utils.fromProjectRoot(flags.assetsDir);

    const appJsPath = _cliCore.Utils.fromProjectRoot(flags.appJsPath);

    const appJsonPath = _path.default.join(buildDir, 'app.json'); // console.log('buildDir ',buildDir);
    // console.log('appJsonPath ',appJsonPath);
    /////////////////////////////
    ///// Transpile & Build /////
    /////////////////////////////
    // const transiplePath = path.join(buildDir, 'dist');


    await (0, _scripts.createBundle)({
      appJsPath,
      assetsDir,
      buildDir,
      configDir,
      name: 'expo'
    }); ///////////////////////////////
    //// Expo Building Process ////
    ///////////////////////////////

    const child = (0, _child_process.spawn)((0, _fromRoot.default)('./node_modules/.bin/expo-cli'), ['build:ios', '--config', _cliCore.Utils.fromProjectRoot(appJsonPath)], {
      shell: true,
      env: process.env,
      stdio: 'inherit'
    }).on('close', _code => process.exit(0)).on('error', spawnError => _cliCore.Utils.logger.error(spawnError)); // Utils.fr

    process.on('SIGINT', () => {
      _cliCore.Utils.logger.log({
        label: '@bluebase/cli/expo',
        level: 'info',
        message: '💀 Caught interrupt signal, exiting!'
      });

      child.kill();
      process.exit();
    });
    return;
  }

}

exports.default = ExpoBuild;
(0, _defineProperty2.default)(ExpoBuild, "description", 'creates a build for ios.');
(0, _defineProperty2.default)(ExpoBuild, "examples", [`$ bluebase expo:build:ios`]);
(0, _defineProperty2.default)(ExpoBuild, "flags", _flags.ExpoFlagDefs);