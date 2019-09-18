"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyTemplateFiles = void 0;

var _cliCore = require("@bluebase/cli-core");

var _fromRoot = require("./fromRoot");

var _path = _interopRequireDefault(require("path"));

/**
 * Copy template files to project directory.
 */
const copyTemplateFiles = async (assetsDir, configDir) => {
  await (0, _cliCore.copyTemplateFiles)(assetsDir, configDir); // Copy files

  await _cliCore.Utils.copyAll((0, _fromRoot.fromRoot)('templates/assets'), _cliCore.Utils.fromProjectRoot(assetsDir), true, false);
  await _cliCore.Utils.copyTemplateFiles((0, _fromRoot.fromRoot)('./templates/web'), _cliCore.Utils.fromProjectRoot(configDir), {
    force: false,
    prompt: true,
    variables: {
      'ASSET_DIR_PATH': `./${_path.default.relative(configDir, assetsDir)}`
    },
    writeFiles: ['bluebase.ts']
  }); ///// Read package.json

  _cliCore.Utils.mergePackageJson({
    scripts: {
      'web:start': 'bluebase web:start'
    }
  });
};

exports.copyTemplateFiles = copyTemplateFiles;