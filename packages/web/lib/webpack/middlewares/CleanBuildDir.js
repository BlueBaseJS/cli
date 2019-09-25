"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

/**
 * Clean the directory before a fresh build
 * @param config
 * @param builder
 */
const CleanBuildDir = () => (config, builder) => {
  // if (!config.output || !config.output.path) {
  // 	return config;
  // }
  return (0, _webpackMerge.default)(config, {
    plugins: [new _cleanWebpackPlugin.default(builder.configs.outputPath)]
  });
};

var _default = CleanBuildDir;
exports.default = _default;