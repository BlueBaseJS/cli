'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reactApplicationMiddleware;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _reactAsyncComponent = require('react-async-component');

var _reactAsyncBootstrapper = require('react-async-bootstrapper');

var _reactAsyncBootstrapper2 = _interopRequireDefault(_reactAsyncBootstrapper);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _ServerHTML = require('./ServerHTML');

var _ServerHTML2 = _interopRequireDefault(_ServerHTML);

var _DemoApp = require('../../../shared/components/DemoApp');

var _DemoApp2 = _interopRequireDefault(_DemoApp);

var _utils = require('../../../internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * React application middleware, supports server side rendering.
 */
function reactApplicationMiddleware(request, response) {
  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if ((0, _config2.default)('disableSSR')) {
    if (process.env.BUILD_FLAG_IS_DEV === 'true') {
      // eslint-disable-next-line no-console
      (0, _utils.log)({
        title: 'Server',
        level: 'info',
        message: `Handling react route without SSR: ${request.url}`
      });
    }
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_ServerHTML2.default, { nonce: nonce }));
    response.status(200).send(`<!DOCTYPE html>${html}`);
    return;
  }

  // Create a context for our AsyncComponentProvider.
  const asyncComponentsContext = (0, _reactAsyncComponent.createAsyncContext)();

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {};

  // Declare our React application.
  const app = _react2.default.createElement(
    _reactAsyncComponent.AsyncComponentProvider,
    { asyncContext: asyncComponentsContext },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: request.url, context: reactRouterContext },
      _react2.default.createElement(_DemoApp2.default, null)
    )
  );

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  (0, _reactAsyncBootstrapper2.default)(app).then(() => {
    const appString = (0, _server.renderToString)(app);

    // Generate the html response.
    const html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_ServerHTML2.default, {
      reactAppString: appString,
      nonce: nonce,
      helmet: _reactHelmet2.default.rewind(),
      asyncComponentsState: asyncComponentsContext.getState()
    }));

    // Check if the router context contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (reactRouterContext.url) {
      response.status(302).setHeader('Location', reactRouterContext.url);
      response.end();
      return;
    }

    response.status(reactRouterContext.missed ? // If the renderResult contains a "missed" match then we set a 404 code.
    // Our App component will handle the rendering of an Error404 view.
    404 : // Otherwise everything is all good and we send a 200 OK status.
    200).send(`<!DOCTYPE html>${html}`);
  });
}