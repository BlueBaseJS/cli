"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fromProjectRoot = require("@bluebase/cli-core/lib/utils/paths/fromProjectRoot");

// Middleware to serve our service worker.
const serviceWorkerMiddleware = configs => (_req, res, _next) => {
  res.sendFile((0, _fromProjectRoot.fromProjectRoot)(`./${configs.clientConfigs.outputPath}/${configs.serverConfigs.serviceWorker.fileName}`));
};

var _default = serviceWorkerMiddleware;
exports.default = _default;