"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOwn = void 0;

var _path = _interopRequireDefault(require("path"));

const useOwn = (...segments) => {
  return _path.default.resolve(__dirname, '..', '..', 'node_modules', ...segments);
};

exports.useOwn = useOwn;