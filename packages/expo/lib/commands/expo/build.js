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

class ExpoBuild extends _command.Command {
  // static flags = ExpoFlagDefs;
  async run() {
    const parsed = this.parse(ExpoBuild);
    const flags = parsed.flags;

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '🏗 Building android project...'
    }); // run expo:ios build script


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
    });
    return;
  }

}

exports.default = ExpoBuild;
(0, _defineProperty2.default)(ExpoBuild, "description", 'creates a expo build directory with app.json file');
(0, _defineProperty2.default)(ExpoBuild, "examples", [`$ bluebase expo:build`]);
(0, _defineProperty2.default)(ExpoBuild, "flags", _flags.ExpoFlagDefs);