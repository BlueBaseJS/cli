"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

// tslint:disable-next-line: sort-imports
// tslint:disable-next-line:no-var-requires
const WriteJsonPlugin = require('write-json-webpack-plugin');
/**
 * Add jarvis dashboard
 * @param config
 * @param builder
 */


const WriteJsonMiddleware = opts => config => {
  return (0, _webpackMerge.default)(config, {
    plugins: [new WriteJsonPlugin(opts)]
  });
};

var _default = WriteJsonMiddleware;
exports.default = _default;