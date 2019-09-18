"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlueBasePath = void 0;

var _cliCore = require("@bluebase/cli-core");

var _findFile = require("./findFile");

var _path = _interopRequireDefault(require("path"));

const getBlueBasePath = async ({
  configDir
}) => {
  const bluebaseJsPath = (0, _findFile.findFile)(_path.default.resolve(configDir, 'bluebase'), _cliCore.Utils.fromCore('templates/common/bluebase.ts'));
  return bluebaseJsPath;
};

exports.getBlueBasePath = getBlueBasePath;