"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assetsWebpackPlugin = _interopRequireDefault(require("assets-webpack-plugin"));

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

const removeNil = _cliCore.Utils.removeNil;
/**
 * Generates a JSON file containing a map of all the output files for
 * our webpack bundle.  A necessisty for our server rendering process
 * as we need to interogate these files in order to know what JS/CSS
 * we need to inject into our HTML. We only need to know the assets for
 * our client bundle.
 * @param config
 * @param builder
 */

const AssetsJson = () => (config, builder) => {
  return (0, _webpackMerge.default)(config, {
    plugins: removeNil([builder.ifClient(() => new _assetsWebpackPlugin.default({
      filename: builder.configs.bundleAssetsFileName,
      path: builder.configs.outputPath,
      prettyPrint: builder.isDev ? true : false
    }))])
  });
};

var _default = AssetsJson;
exports.default = _default;