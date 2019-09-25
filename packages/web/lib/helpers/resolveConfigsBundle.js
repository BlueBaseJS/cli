"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveConfigsBundle = resolveConfigsBundle;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _client = _interopRequireDefault(require("../configFiles/client.config"));

var _webpackConfig = _interopRequireDefault(require("../configFiles/webpack.config.client"));

var _server = _interopRequireDefault(require("../configFiles/server.config"));

var _webpackConfig2 = _interopRequireDefault(require("../configFiles/webpack.config.server"));

// Transpile files on the fly
// tslint:disable-next-line:no-var-requires
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: ['@bluebase/babel-preset-bluebase']
});

/**
 * Returns everything required by the run script.
 *
 * i.e. resolves all paths and configs
 *
 * @param paths
 * @param options
 */
function resolveConfigsBundle(paths, options) {
  const {
    development = true
  } = options; ///////////////////////////////////
  ///// Generate Client Configs /////
  ///////////////////////////////////
  // Get default configs

  let clientConfigs = (0, _client.default)({}, paths); // Import the file

  let customClientConfigs = require(paths.clientConfigPath);

  customClientConfigs = customClientConfigs.default || customClientConfigs; // Use these configs

  clientConfigs = customClientConfigs(clientConfigs, paths); ///////////////////////////////////
  ///// Generate Server Configs /////
  ///////////////////////////////////
  // Get default configs

  let serverConfigs = (0, _server.default)({}, paths); // Import the file

  let customServerConfigs = require(paths.serverConfigPath);

  customServerConfigs = customServerConfigs.default || customServerConfigs; // Use these configs

  serverConfigs = customServerConfigs(serverConfigs, paths); // //////////////////////////////////
  // ///// Client Webpack Configs /////
  // //////////////////////////////////

  const baseClientWebpackOptions = (0, _objectSpread2.default)({}, paths, {
    configs: (0, _objectSpread2.default)({}, clientConfigs, {
      mode: development ? 'development' : 'production'
    })
  }); // Get default webpack configs

  let clientWebpackConfigs = (0, _webpackConfig.default)({}, baseClientWebpackOptions); // Import the file

  let customClientWebpackConfigs = require(paths.clientWebpackConfigPath);

  customClientWebpackConfigs = customClientWebpackConfigs.default || customClientWebpackConfigs; // Use these configs

  clientWebpackConfigs = customClientWebpackConfigs(clientWebpackConfigs, baseClientWebpackOptions); // //////////////////////////////////
  // ///// Server Webpack Configs /////
  // //////////////////////////////////

  const baseServerWebpackOptions = (0, _objectSpread2.default)({}, paths, {
    configs: (0, _objectSpread2.default)({}, serverConfigs, {
      mode: development ? 'development' : 'production'
    })
  }); // Get default webpack configs

  let serverWebpackConfigs = (0, _webpackConfig2.default)({}, baseServerWebpackOptions); // Import the file

  let customServerWebpackConfigs = require(paths.serverWebpackConfigPath);

  customServerWebpackConfigs = customServerWebpackConfigs.default || customServerWebpackConfigs; // Use these configs

  serverWebpackConfigs = customServerWebpackConfigs(serverWebpackConfigs, baseServerWebpackOptions); //////////////////
  ///// Return /////
  //////////////////

  return (0, _objectSpread2.default)({}, paths, {
    clientConfigs,
    clientWebpackConfigs,
    serverConfigs,
    serverWebpackConfigs
  });
}