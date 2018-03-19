'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Middleware to serve our service worker.
/* eslint-disable no-unused-vars */

function serviceWorkerMiddleware(req, res, next) {
  res.sendFile((0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('bundles.client.outputPath'), (0, _config2.default)('serviceWorker.fileName')));
}

exports.default = serviceWorkerMiddleware;