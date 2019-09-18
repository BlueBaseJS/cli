"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _useOwn = require("../../helpers/useOwn");

/**
 * Patch React Native imports
 * @param config
 * @param builder
 */
const ReactNative = () => config => {
  return (0, _webpackMerge.default)(config, {
    resolve: {
      alias: {
        'react-native$': (0, _useOwn.useOwn)('react-native-web')
      }
    }
  });
};

var _default = ReactNative;
exports.default = _default;