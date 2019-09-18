"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyTemplateFiles = void 0;

var _cliCore = require("@bluebase/cli-core");

var _fromRoot = _interopRequireDefault(require("../fromRoot"));

/**
 * Copy template files to project directory.
 */
const copyTemplateFiles = async (assetsDir, configDir) => {
  await (0, _cliCore.copyTemplateFiles)(assetsDir, configDir); // Copy files

  await _cliCore.Utils.copyAll((0, _fromRoot.default)('templates/expo'), _cliCore.Utils.fromProjectRoot(configDir));
  await _cliCore.Utils.copyAll((0, _fromRoot.default)('templates/assets'), _cliCore.Utils.fromProjectRoot(assetsDir)); ///// Read package.json

  _cliCore.Utils.mergePackageJson({
    scripts: {
      'expo:start': 'bluebase expo:start'
    }
  });
};

exports.copyTemplateFiles = copyTemplateFiles;