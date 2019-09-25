"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

/**
 * Hot Module Replacement support
 * @param config
 * @param builder
 */
const CopyAssets = (options = {
  assetsDir: 'assets'
}) => (config, builder) => {
  return (0, _webpackMerge.default)(config, {
    plugins: [new _copyWebpackPlugin.default([{
      from: builder.configs.publicPath,
      to: `${builder.configs.outputPath}/${options.assetsDir}`
    }])]
  });
};

var _default = CopyAssets;
exports.default = _default;