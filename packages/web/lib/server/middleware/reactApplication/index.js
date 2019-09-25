"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _withSSR = _interopRequireDefault(require("./withSSR"));

var _withoutSSR = _interopRequireDefault(require("./withoutSSR"));

/**
 * React application middleware, supports server side rendering.
 */
var _default = configs => (req, res) => configs.serverConfigs.disableSSR ? (0, _withoutSSR.default)(req, res, configs) : (0, _withSSR.default)(req, res, configs);

exports.default = _default;