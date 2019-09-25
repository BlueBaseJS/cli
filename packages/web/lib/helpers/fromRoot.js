"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromRoot = void 0;

var _path = _interopRequireDefault(require("path"));

const fromRoot = (...segments) => {
  return _path.default.resolve(__dirname, '..', '..', ...segments);
};

exports.fromRoot = fromRoot;