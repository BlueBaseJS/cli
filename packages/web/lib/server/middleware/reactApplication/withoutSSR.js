"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ServerHTML = _interopRequireDefault(require("./ServerHTML"));

var _logger = _interopRequireDefault(require("@bluebase/cli-core/lib/utils/logger"));

var _server = require("react-dom/server");

var _default = (request, response, configs) => {
  const ServerHTML = (0, _ServerHTML.default)(configs); // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.

  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }

  const nonce = response.locals.nonce;

  if (process.env.BUILD_FLAG_IS_DEV === 'true') {
    _logger.default.log({
      label: `@bluebase/cli/server`,
      level: 'info',
      message: `Handling react route without SSR: ${request.url}`
    });
  } // SSR is disabled so we will return an "empty" html page and
  // rely on the client to initialize and render the react application.


  const simpleHtml = (0, _server.renderToStaticMarkup)(_react.default.createElement(ServerHTML, {
    nonce: nonce
  }));
  response.status(200).send(`<!DOCTYPE html>${simpleHtml}`);
  return;
};

exports.default = _default;