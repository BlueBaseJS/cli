"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

// tslint:disable-next-line:no-var-requires
const Jarvis = require('webpack-jarvis');

const removeNil = _cliCore.Utils.removeNil;
/**
 * Add jarvis dashboard
 * @param config
 * @param builder
 */

const JarvisMiddleware = (port = 1338) => (config, builder) => {
  return (0, _webpackMerge.default)(config, {
    plugins: removeNil([builder.ifDevClient(() => new Jarvis({
      port
    }))])
  });
};

var _default = JarvisMiddleware;
exports.default = _default;