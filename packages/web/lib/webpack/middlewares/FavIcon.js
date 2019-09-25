"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _faviconsWebpackPlugin = _interopRequireDefault(require("favicons-webpack-plugin"));

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

// tslint:disable-next-line:no-var-requires
const removeNil = _cliCore.Utils.removeNil;
/**
 * Javascript loader
 * @param config
 * @param builder
 */

const FavIcon = () => (config, builder) => {
  const newConfig = (0, _webpackMerge.default)(config, {
    plugins: removeNil([// favIconPlugin
    new _faviconsWebpackPlugin.default(builder.configs.favIconConfig)])
  });
  return newConfig;
};

var _default = FavIcon;
exports.default = _default;