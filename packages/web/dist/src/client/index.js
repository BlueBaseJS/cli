'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ReactHotLoader = require('./components/ReactHotLoader');

var _ReactHotLoader2 = _interopRequireDefault(_ReactHotLoader);

var _BlueRain = require('../shared/components/BlueRain');

var _BlueRain2 = _interopRequireDefault(_BlueRain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

/**
 * Renders the given React Application component.
 */

// import './polyfills';

function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = _react2.default.createElement(
    _ReactHotLoader2.default,
    null,
    _react2.default.createElement(TheApp, null)
  );

  (0, _reactDom.render)(app, container);
}

// Execute the first render of our app.
renderApp(_BlueRain2.default);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('../shared/components/BlueRain/index.js', () => {
    renderApp(require('../shared/components/BlueRain').default);
  });
}