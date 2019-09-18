"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

const style = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
};
/**
 * The is the loading screen when the bundle is downloading, while SSR is disabled.
 */

const SplashScreen = () => {
  return _react.default.createElement("div", {
    style: style
  }, _react.default.createElement("img", {
    src: "/loading.gif"
  }));
};

var _default = SplashScreen;
exports.default = _default;