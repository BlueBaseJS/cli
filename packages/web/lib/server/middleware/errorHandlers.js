"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("@bluebase/cli-core/lib/utils/logger"));

const errorHandlersMiddleware = [
/**
 * 404 errors middleware.
 *
 * NOTE: the react application middleware hands 404 paths, but it is good to
 * have this backup for paths not handled by the react middleware. For
 * example you may bind a /api path to express.
 */
// tslint:disable-next-line:only-arrow-functions
function notFoundMiddlware(_req, res, _next) {
  res.status(404).send('Sorry, that resource was not found.');
},
/**
 * 500 errors middleware.
 *
 * NOTE: You must provide specify all 4 parameters on this callback function
 * even if they aren't used, otherwise it won't be used.
 */
// tslint:disable-next-line:only-arrow-functions
function unexpectedErrorMiddleware(err, _req, res, _next) {
  if (err) {
    _logger.default.log({
      error: err,
      label: '@bluebase/cli/server',
      level: 'error',
      message: 'An unexpected error occurred'
    });
  }

  res.status(500).send('Sorry, an unexpected error occurred.');
}];
var _default = errorHandlersMiddleware;
exports.default = _default;