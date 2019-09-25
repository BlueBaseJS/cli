"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _server = require("react-dom/server");

var _APP_JS = _interopRequireDefault(require("APP_JS"));

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

var _ServerHTML = _interopRequireDefault(require("./ServerHTML"));

// tslint:disable-next-line:no-var-requires
// const { AppRegistry } = require('react-native-web');
var _default = (_request, response, configs) => {
  const ServerHTML = (0, _ServerHTML.default)(configs); // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.

  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }

  const nonce = response.locals.nonce; // register the app

  _reactNative.AppRegistry.registerComponent('App', () => _APP_JS.default); // prerender the app


  const {
    element,
    getStyleElement
  } = _reactNative.AppRegistry.getApplication('App'); // first the element


  const appString = (0, _server.renderToString)(element); // then the styles (optionally include a nonce if your CSP policy requires it)

  const StyleElement = getStyleElement({
    nonce
  }); // Generate the html response.

  const html = (0, _server.renderToStaticMarkup)(_react.default.createElement(ServerHTML, {
    reactAppString: appString,
    nonce: nonce,
    styleElement: StyleElement
  })); //   // Check if the router context contains a redirect, if so we need to set
  //   // the specific status and redirect header and end the response.
  // 	if (reactRouterContext.url) {
  // 		response.status(302).setHeader('Location', reactRouterContext.url);
  // 		response.end();
  // 		return;
  // 	}

  response.status( // reactRouterContext.missed
  //   ? // If the renderResult contains a "missed" match then we set a 404 code.
  //   // Our App component will handle the rendering of an Error404 view.
  //   404
  //   : // Otherwise everything is all good and we send a 200 OK status.
  200).send(`<!DOCTYPE html>${html}`); // });
};

exports.default = _default;