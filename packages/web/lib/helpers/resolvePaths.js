"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePaths = resolvePaths;

var _paths = require("@bluebase/cli-core/lib/utils/paths");

var _findFile = require("./findFile");

var _path = _interopRequireDefault(require("path"));

/**
 * Returns paths to all relevant files.
 *
 * i.e. resolves all paths and configs
 *
 * @param flags
 */
function resolvePaths(flags) {
  /////////////////////////
  ///// Resolve Paths /////
  /////////////////////////
  // Absolute path of build dir
  const assetsDir = (0, _paths.fromProjectRoot)(flags.assetsDir);
  const buildDir = (0, _paths.fromProjectRoot)(flags.buildDir);
  const configDir = (0, _paths.fromProjectRoot)(flags.configDir); // bluebase.js

  const bluebaseJsPath = (0, _findFile.findFile)(_path.default.resolve(flags.configDir, 'bluebase'), (0, _paths.fromCore)('templates/common/bluebase.ts')); //////////////////
  ///// App.js /////
  //////////////////
  // App.js

  const appJsPath = (0, _findFile.findFile)(_path.default.resolve(flags.configDir, 'App'), _path.default.resolve(__dirname, '../client/App.js')); ///////////////////////////////////
  ///// Generate Client Configs /////
  ///////////////////////////////////
  // See if there is a custom config file in the project

  const clientConfigPath = (0, _findFile.findFile)(_path.default.resolve(flags.configDir, 'config.client'), _path.default.resolve(__dirname, './emptyFn.js')); // See if there is a custom webpack config file in the project

  const clientWebpackConfigPath = (0, _findFile.findFile)(_path.default.resolve(flags.configDir, 'webpack.config.client'), _path.default.resolve(__dirname, './emptyFn.js')); ///////////////////////////////////
  ///// Generate Server Configs /////
  ///////////////////////////////////
  // See if there is a custom config file in the project

  const serverConfigPath = (0, _findFile.findFile)(_path.default.resolve(flags.configDir, 'config.server'), _path.default.resolve(__dirname, './emptyFn.js')); // See if there is a custom webpack config file in the project

  const serverWebpackConfigPath = (0, _findFile.findFile)(_path.default.resolve(flags.configDir, 'webpack.config.server'), _path.default.resolve(__dirname, './emptyFn.js')); //////////////////
  ///// Return /////
  //////////////////

  return {
    appJsPath,
    assetsDir,
    bluebaseJsPath,
    buildDir,
    clientConfigPath,
    clientWebpackConfigPath,
    configDir,
    serverConfigPath,
    serverWebpackConfigPath,
    static: flags.static
  };
}