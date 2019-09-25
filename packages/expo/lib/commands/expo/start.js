"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _flags = require("../../flags");

var _command = require("@oclif/command");

var _cliCore = require("@bluebase/cli-core");

var _scripts = require("../../scripts");

var _fromRoot = _interopRequireDefault(require("../../scripts/fromRoot"));

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

class ExpoStart extends _command.Command {
  async run() {
    const parsed = this.parse(ExpoStart);
    const flags = parsed.flags;

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '🏗 Building project...'
    }); // Absolute path of build dir


    const buildDir = _cliCore.Utils.fromProjectRoot(flags.buildDir);

    const configDir = _cliCore.Utils.fromProjectRoot(flags.configDir);

    const assetsDir = _cliCore.Utils.fromProjectRoot(flags.assetsDir);

    const appJsPath = _cliCore.Utils.fromProjectRoot(flags.appJsPath); /////////////////////////////
    ///// Transpile & Build /////
    /////////////////////////////
    // const transiplePath = path.join(buildDir, 'dist');


    await (0, _scripts.createBundle)({
      appJsPath,
      assetsDir,
      buildDir,
      configDir,
      name: 'expo'
    }); ///////////////////////
    ///// Launch expo /////
    ///////////////////////

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '🚀 Launching Expo'
    });

    const appJsonPath = _path.default.join(buildDir, 'app.json');

    const child = (0, _child_process.spawn)((0, _fromRoot.default)('./node_modules/.bin/expo'), ['start', '--config', _cliCore.Utils.fromProjectRoot(appJsonPath)], {
      shell: true,
      env: process.env,
      stdio: 'inherit'
    }).on('close', _code => process.exit(0)).on('error', spawnError => _cliCore.Utils.logger.error(spawnError));
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

exports.default = ExpoStart;
(0, _defineProperty2.default)(ExpoStart, "description", 'Starts or restarts a local server for your app and gives you a URL to it.');
(0, _defineProperty2.default)(ExpoStart, "examples", [`$ bluebase expo:start`]);
(0, _defineProperty2.default)(ExpoStart, "flags", _flags.ExpoFlagDefs);