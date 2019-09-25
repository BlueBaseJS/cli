"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _paths = require("@bluebase/cli-core/lib/utils/paths");

/**
 * Middleware to serve our client bundle.
 */
var _default = configs => _express.default.static((0, _paths.fromProjectRoot)(configs.clientConfigs.outputPath), {
  maxAge: configs.serverConfigs.browserCacheMaxAge
});

exports.default = _default;