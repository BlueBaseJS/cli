'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware to server our client bundle.
 */
exports.default = _express2.default.static((0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('bundles.client.outputPath')), {
  maxAge: (0, _config2.default)('browserCacheMaxAge')
});