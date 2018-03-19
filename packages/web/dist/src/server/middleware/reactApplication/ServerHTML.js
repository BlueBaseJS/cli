'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _ifElse = require('../../../shared/utils/logic/ifElse');

var _ifElse2 = _interopRequireDefault(_ifElse);

var _removeNil = require('../../../shared/utils/arrays/removeNil');

var _removeNil2 = _interopRequireDefault(_removeNil);

var _getClientBundleEntryAssets = require('./getClientBundleEntryAssets');

var _getClientBundleEntryAssets2 = _interopRequireDefault(_getClientBundleEntryAssets);

var _ClientConfig = require('../../../config/components/ClientConfig');

var _ClientConfig2 = _interopRequireDefault(_ClientConfig);

var _HTML = require('../../../shared/components/HTML');

var _HTML2 = _interopRequireDefault(_HTML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PRIVATES

function KeyedComponent({ children }) {
  return _react.Children.only(children);
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */

/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

const clientEntryAssets = (0, _getClientBundleEntryAssets2.default)();

function stylesheetTag(stylesheetFilePath) {
  return _react2.default.createElement('link', { href: stylesheetFilePath, media: 'screen, projection', rel: 'stylesheet', type: 'text/css' });
}

function scriptTag(jsFilePath) {
  return _react2.default.createElement('script', { type: 'text/javascript', src: jsFilePath });
}

// COMPONENT

function ServerHTML(props) {
  const { asyncComponentsState, helmet, nonce, reactAppString } = props;

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => _react2.default.createElement('script', { nonce: nonce, type: 'text/javascript', dangerouslySetInnerHTML: { __html: body } });

  const headerElements = (0, _removeNil2.default)([...(0, _ifElse2.default)(helmet)(() => helmet.meta.toComponent(), []), ...(0, _ifElse2.default)(helmet)(() => helmet.title.toComponent(), []), ...(0, _ifElse2.default)(helmet)(() => helmet.base.toComponent(), []), ...(0, _ifElse2.default)(helmet)(() => helmet.link.toComponent(), []), (0, _ifElse2.default)(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css)), ...(0, _ifElse2.default)(helmet)(() => helmet.style.toComponent(), [])]);

  const bodyElements = (0, _removeNil2.default)([
  // Binds the client configuration object to the window object so
  // that we can safely expose some configuration values to the
  // client bundle that gets executed in the browser.
  _react2.default.createElement(_ClientConfig2.default, { nonce: nonce }),
  // Bind our async components state so the client knows which ones
  // to initialise so that the checksum matches the server response.
  // @see https://github.com/ctrlplusb/react-async-component
  (0, _ifElse2.default)(asyncComponentsState)(() => inlineScript(`window.__ASYNC_COMPONENTS_REHYDRATE_STATE__=${(0, _serializeJavascript2.default)(asyncComponentsState)};`)),
  // Enable the polyfill io script?
  // This can't be configured within a react-helmet component as we
  // may need the polyfill's before our client JS gets parsed.
  (0, _ifElse2.default)((0, _config2.default)('polyfillIO.enabled'))(() => scriptTag(`${(0, _config2.default)('polyfillIO.url')}?features=${(0, _config2.default)('polyfillIO.features').join(',')}`)),
  // When we are in development mode our development server will
  // generate a vendor DLL in order to dramatically reduce our
  // compilation times.  Therefore we need to inject the path to the
  // vendor dll bundle below.
  (0, _ifElse2.default)(process.env.BUILD_FLAG_IS_DEV === 'true' && (0, _config2.default)('bundles.client.devVendorDLL.enabled'))(() => scriptTag(`${(0, _config2.default)('bundles.client.webPath')}${(0, _config2.default)('bundles.client.devVendorDLL.name')}.js?t=${Date.now()}`)), (0, _ifElse2.default)(clientEntryAssets && clientEntryAssets.js)(() => scriptTag(clientEntryAssets.js)), ...(0, _ifElse2.default)(helmet)(() => helmet.script.toComponent(), [])]);

  return _react2.default.createElement(_HTML2.default, {
    htmlAttributes: (0, _ifElse2.default)(helmet)(() => helmet.htmlAttributes.toComponent(), null),
    headerElements: headerElements.map((x, idx) => _react2.default.createElement(
      KeyedComponent,
      { key: idx },
      x
    )),
    bodyElements: bodyElements.map((x, idx) => _react2.default.createElement(
      KeyedComponent,
      { key: idx },
      x
    )),
    appBodyString: reactAppString
  });
}

ServerHTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  asyncComponentsState: _propTypes2.default.object,
  // eslint-disable-next-line react/forbid-prop-types
  helmet: _propTypes2.default.object,
  nonce: _propTypes2.default.string,
  reactAppString: _propTypes2.default.string
};

// EXPORT

exports.default = ServerHTML;