"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackCompile = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

/**
 * compiles a webpack config.
 * @param configs
 */
const webpackCompile = async configs => {
  return new Promise((resolve, _reject) => {
    const compiler = (0, _webpack.default)(configs);
    compiler.run((err, stats) => {
      if (err) {
        throw err;
      }

      resolve(stats);
    });
  });
};

exports.webpackCompile = webpackCompile;