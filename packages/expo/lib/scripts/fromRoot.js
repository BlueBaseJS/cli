"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _default = (...segments) => {
  return _path.default.resolve(__dirname, '..', '..', ...segments);
};

exports.default = _default;