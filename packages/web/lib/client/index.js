"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("normalize.css");

var _APP_JS = _interopRequireDefault(require("APP_JS"));

var _reactNative = require("react-native");

// register the app
_reactNative.AppRegistry.registerComponent('App', () => _APP_JS.default);

_reactNative.AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.querySelector('#app')
}); // This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
// tslint:disable-next-line


require('./registerServiceWorker');