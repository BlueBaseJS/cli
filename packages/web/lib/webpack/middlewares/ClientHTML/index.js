"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _path = _interopRequireDefault(require("path"));

const removeNil = _cliCore.Utils.removeNil;
/**
 * Generate index.html for client
 * @param config
 * @param builder
 */

const ClientHTML = () => (config, builder) => {
  return (0, _webpackMerge.default)(config, {
    plugins: removeNil([// We need this plugin to enable hot reloading of our client.
    builder.ifClient(() => new _htmlWebpackPlugin.default({
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        // removeNilAttributes: true,
        useShortDoctype: true
      },
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      production: true,
      template: `${_path.default.resolve(__dirname, './template.js')}` // We pass our config and client config script compoent as it will
      // be needed by the offline template.
      // custom: {
      // 	config,
      // 	ClientConfig,
      // },

    }))])
  });
};

var _default = ClientHTML;
exports.default = _default;