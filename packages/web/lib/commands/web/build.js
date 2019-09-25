"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartStaticCommand = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _command = require("@oclif/command");

var _cliFlags = require("../../cli-flags");

var _cliCore = require("@bluebase/cli-core");

var _createCleanDir = require("../../helpers/createCleanDir");

var _resolveConfigsBundle = require("../../helpers/resolveConfigsBundle");

var _resolvePaths = require("../../helpers/resolvePaths");

var _webpackCompile = require("../../helpers/webpackCompile");

class StartStaticCommand extends _command.Command {
  async run() {
    const label = '@bluebase/cli/web';
    const development = false;
    const parsed = this.parse(StartStaticCommand);
    const flags = parsed.flags;

    _cliCore.Utils.logger.log({
      label,
      level: 'info',
      message: '🌏 Starting BlueBase Development Server...'
    }); ///////////////////////////
    ///// Extract Configs /////
    ///////////////////////////


    const paths = (0, _resolvePaths.resolvePaths)(flags);
    const {
      buildDir,
      clientWebpackConfigs
    } = (0, _resolveConfigsBundle.resolveConfigsBundle)(paths, {
      development
    }); ///////////////////////////
    ///// Clear build dir /////
    ///////////////////////////

    (0, _createCleanDir.createCleanDir)(buildDir); /////////////////
    ///// Build /////
    /////////////////

    _cliCore.Utils.logger.log({
      label,
      level: 'info',
      message: '🏗 Building BlueBase web project...'
    });

    (0, _webpackCompile.webpackCompile)(clientWebpackConfigs);
  }

}

exports.StartStaticCommand = StartStaticCommand;
(0, _defineProperty2.default)(StartStaticCommand, "flags", _cliFlags.FlagDefs);