"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppJson = void 0;

var _configs = _interopRequireDefault(require("../../configs"));

var _findFile = require("./findFile");

var _path = _interopRequireDefault(require("path"));

// Transpile files on the fly
// tslint:disable-next-line:no-var-requires
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: ['@bluebase/code-standards/babel.config.js']
});

const getAppJson = async ({
  assetsDir,
  buildDir,
  configDir
}) => {
  ///////////////////////////////////
  ///// Generate Client Configs /////
  ///////////////////////////////////
  const paths = {
    buildDir,
    configDir,
    assetsDir
  }; // Get default configs

  let configs = (0, _configs.default)({}, paths); // See if there is a custom config file in the project

  const configPath = (0, _findFile.findFile)(_path.default.resolve(configDir, 'configs'), _path.default.resolve(__dirname, './emptyFn.js')); // Import the file

  let customConfigs = require(configPath);

  customConfigs = customConfigs.default || customConfigs; // Use these configs

  configs = customConfigs(configs, paths); /////////////////////////////
  ///// Generate app.json /////
  /////////////////////////////

  const appJson = {
    expo: configs.manifest
  };
  return appJson;
};

exports.getAppJson = getAppJson;