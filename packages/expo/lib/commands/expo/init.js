"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _flags = require("../../flags");

var _dependencies = require("../../scripts/dependencies");

var _command = require("@oclif/command");

var _cliCore = require("@bluebase/cli-core");

var _scripts = require("../../scripts");

class ExpoStart extends _command.Command {
  async run() {
    const parsed = this.parse(ExpoStart);
    const flags = parsed.flags;

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '🛠 Initializing a new BlueBase + Expo project...'
    }); // Absolute path of build dir


    const configDir = _cliCore.Utils.fromProjectRoot(flags.configDir); // const buildDir = Utils.fromProjectRoot(flags.buildDir);


    const assetsDir = _cliCore.Utils.fromProjectRoot(flags.assetsDir); // const paths = { assetsDir, buildDir, configDir };
    ///////////////////////////////
    ///// Copy Template Files /////
    ///////////////////////////////


    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '📂 Creating Expo configuration directory...'
    });

    await (0, _scripts.copyTemplateFiles)(assetsDir, configDir); ////////////////////////////
    ///// Add dependencies /////
    ////////////////////////////

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '📦 Installing dependencies...'
    }); // Install dependencies


    _cliCore.Utils.installMissing(_dependencies.requiredDependencies, false);

    _cliCore.Utils.installMissing(_dependencies.requiredDevDependencies, true); // Finish


    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/expo',
      level: 'info',
      message: '✅ Done! BlueBase + Expo project initialized.'
    });

    return;
  }

}

exports.default = ExpoStart;
(0, _defineProperty2.default)(ExpoStart, "description", 'Initializes a directory with an example project.');
(0, _defineProperty2.default)(ExpoStart, "examples", [`$ bluebase expo:init`]);
(0, _defineProperty2.default)(ExpoStart, "flags", _flags.ExpoFlagDefs);