"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliCore = require("@bluebase/cli-core");

var _workboxWebpackPlugin = _interopRequireDefault(require("workbox-webpack-plugin"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

// tslint:disable-next-line:no-var-requires
const removeNil = _cliCore.Utils.removeNil;
/**
 * Javascript loader
 * @param config
 * @param builder
 */

const WorkBox = () => (config, builder) => {
  const newConfig = (0, _webpackMerge.default)(config, {
    plugins: removeNil([// wordbox plugin for PWA
    new _workboxWebpackPlugin.default.GenerateSW(builder.configs.workBox.config) // new WorkboxPlugin.InjectManifest(builder.configs.workBoxConfig)
    ])
  });
  return newConfig;
};

var _default = WorkBox;
exports.default = _default;