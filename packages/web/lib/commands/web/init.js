"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dependencies = require("../../helpers/dependencies");

var _command = require("@oclif/command");

var _cliFlags = require("../../cli-flags");

var _cliCore = require("@bluebase/cli-core");

var _copyTemplateFiles = require("../../helpers/copyTemplateFiles");

class CustomCommand extends _command.Command {
  async run() {
    const parsed = this.parse(CustomCommand);
    const flags = parsed.flags;

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/web',
      level: 'info',
      message: '🛠 Initializing a new BlueBase Web project...'
    }); // Absolute path of build dir


    const configDir = _cliCore.Utils.fromProjectRoot(flags.configDir); // const buildDir = Utils.fromProjectRoot(flags.buildDir);


    const assetsDir = _cliCore.Utils.fromProjectRoot(flags.assetsDir); ///////////////////////////////
    ///// Copy Template Files /////
    ///////////////////////////////


    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/web',
      level: 'info',
      message: '📂 Creating web configuration directory...'
    });

    await (0, _copyTemplateFiles.copyTemplateFiles)(assetsDir, configDir); ////////////////////////////
    ///// Add dependencies /////
    ////////////////////////////

    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/web',
      level: 'info',
      message: '📦 Installing dependencies...'
    }); // Install dependencies


    _cliCore.Utils.installMissing(_dependencies.requiredDependencies, false);

    _cliCore.Utils.installMissing(_dependencies.requiredDevDependencies, true); // Finish


    _cliCore.Utils.logger.log({
      label: '@bluebase/cli/web',
      level: 'info',
      message: '✅ Done! BlueBase Web project initialized.'
    });

    return;
  }

}

exports.default = CustomCommand;
(0, _defineProperty2.default)(CustomCommand, "description", 'Initializes a directory with an example project.');
(0, _defineProperty2.default)(CustomCommand, "examples", [`$ bluebase web:init`]);
(0, _defineProperty2.default)(CustomCommand, "flags", _cliFlags.FlagDefs);