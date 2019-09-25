"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartCommand = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _command = require("@oclif/command");

var _cliFlags = require("../../cli-flags");

var _cliCore = require("@bluebase/cli-core");

var _createCleanDir = require("../../helpers/createCleanDir");

var _resolveConfigsBundle = require("../../helpers/resolveConfigsBundle");

var _resolvePaths = require("../../helpers/resolvePaths");

var _child_process = require("child_process");

var _webpackCompile = require("../../helpers/webpackCompile");

var _webpackCompileDev = require("../../helpers/webpackCompileDev");

class StartCommand extends _command.Command {
  async run() {
    const label = '@bluebase/cli/web';
    const development = true;

    _cliCore.Utils.logger.log({
      label,
      level: 'info',
      message: '🌏 Starting BlueBase on Web...'
    }); ///////////////////////////
    ///// Extract Configs /////
    ///////////////////////////


    const parsed = this.parse(StartCommand);
    const flags = parsed.flags;
    const paths = (0, _resolvePaths.resolvePaths)(flags);
    const configs = (0, _resolveConfigsBundle.resolveConfigsBundle)(paths, {
      development
    }); ///////////////////////////
    ///// Clear build dir /////
    ///////////////////////////

    (0, _createCleanDir.createCleanDir)(configs.buildDir); /////////////////
    ///// Build /////
    /////////////////

    _cliCore.Utils.logger.log({
      label,
      level: 'info',
      message: `👨‍💻 Compiling BlueBase's client bundle`
    });

    (0, _webpackCompileDev.webpackCompileDev)({
      config: configs.clientWebpackConfigs,
      host: configs.clientConfigs.devServerHost,
      port: configs.clientConfigs.devServerPort,
      on: {
        'build-finished': () => {
          if (flags.static === false) {
            // startServer(configs, '@bluebase/cli/web-server');
            (0, _webpackCompile.webpackCompile)(configs.serverWebpackConfigs).then(() => {
              (0, _child_process.spawn)('node', [_cliCore.Utils.fromProjectRoot(configs.buildDir, 'server/index.js')], {
                shell: true,
                env: process.env,
                stdio: 'inherit'
              }).on('close', _code => process.exit(0)).on('error', spawnError => _cliCore.Utils.logger.error(spawnError));
            });
          }
        }
      }
    }, label);
  }

}

exports.StartCommand = StartCommand;
(0, _defineProperty2.default)(StartCommand, "flags", _cliFlags.FlagDefs);