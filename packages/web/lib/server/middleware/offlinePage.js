"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _paths = require("@bluebase/cli-core/lib/utils/paths");

var _fs = require("fs");

/**
 * Middleware to intercept calls to our offline page to ensure that
 * inline scripts get a nonce value attached to them.
 */
const offlinePageMiddleware = configs => (_req, res, _next) => {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }

  const nonce = res.locals.nonce;
  (0, _fs.readFile)( // Path to the offline page.
  (0, _paths.fromProjectRoot)(`./${configs.clientConfigs.outputPath}/${configs.serverConfigs.serviceWorker.offlinePageFileName}`), // Charset for read
  'utf-8', // Read handler
  (err, data) => {
    if (err) {
      res.status(500).send('Error returning offline page.');
      return; // We replace the placeholder with the actual nonce.

      const offlinePageWithNonce = data.replace('OFFLINE_PAGE_NONCE_PLACEHOLDER', nonce); // Send back the page as the response

      res.send(offlinePageWithNonce);
    }
  });
};

var _default = offlinePageMiddleware;
exports.default = _default;