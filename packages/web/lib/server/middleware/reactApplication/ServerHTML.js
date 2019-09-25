"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _HTML = _interopRequireDefault(require("../../components/HTML"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _SplashScreen = _interopRequireDefault(require("../../components/SplashScreen"));

var _getClientBundleEntryAssets = _interopRequireDefault(require("./getClientBundleEntryAssets"));

var _logic = require("@bluebase/cli-core/lib/utils/logic");

var _arrays = require("@bluebase/cli-core/lib/utils/arrays");

var _server = require("react-dom/server");

/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */
// PRIVATES
const KeyedComponent = ({
  children
}) => {
  return _react.Children.only(children);
};

function stylesheetTag(stylesheetFilePath) {
  return _react.default.createElement("link", {
    href: stylesheetFilePath,
    media: "screen, projection",
    rel: "stylesheet",
    type: "text/css"
  });
}

function scriptTag(jsFilePath) {
  return _react.default.createElement("script", {
    type: "text/javascript",
    src: jsFilePath
  });
} // ServerHTML Component


const getServerHTML = configs => props => {
  // Resolve the assets (js/css) for the client bundle's entry chunk.
  const clientEntryAssets = (0, _getClientBundleEntryAssets.default)(configs)();
  const {
    reactAppString,
    styleElement
  } = props;

  const helmet = _reactHelmet.default.rewind(); // // Creates an inline script definition that is protected by the nonce.
  // 	const inlineScript = (body: any) =>
  // 	<script nonce={nonce} type="text/javascript" dangerouslySetInnerHTML={{ __html: body }} />;


  const headerElements = (0, _arrays.removeNil)([...(0, _logic.ifElse)(helmet)(() => helmet.meta.toComponent(), []), ...(0, _logic.ifElse)(helmet)(() => helmet.title.toComponent(), []), ...(0, _logic.ifElse)(helmet)(() => helmet.base.toComponent(), []), ...(0, _logic.ifElse)(helmet)(() => helmet.link.toComponent(), []), (0, _logic.ifElse)(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css)), ...(0, _logic.ifElse)(helmet)(() => helmet.style.toComponent(), []), (0, _logic.ifElse)(helmet)(() => styleElement)]); // const devVendorDLL = configs.clientConfigs.devVendorDLL;

  const bodyElements = (0, _arrays.removeNil)([// When we are in development mode our development server will
  // generate a vendor DLL in order to dramatically reduce our
  // compilation times.  Therefore we need to inject the path to the
  // vendor dll bundle below.
  // 	ifElse(
  // 		process.env.BUILD_FLAG_IS_DEV === 'true' && devVendorDLL && devVendorDLL.enabled,
  // )(() =>
  // 	scriptTag(
  // 		`${configs.clientConfigs.publicPath}/${devVendorDLL && devVendorDLL.name}.js?t=${Date.now()}`,
  // 	),
  // ),
  (0, _logic.ifElse)(clientEntryAssets && clientEntryAssets.js)(() => scriptTag(clientEntryAssets.js)), ...(0, _logic.ifElse)(helmet)(() => helmet.script.toComponent(), [])]);
  return _react.default.createElement(_HTML.default, {
    htmlAttributes: (0, _logic.ifElse)(helmet)(() => helmet.htmlAttributes.toComponent(), null),
    headerElements: headerElements.map((x, idx) => {
      return _react.default.createElement(KeyedComponent, {
        key: idx
      }, x);
    }),
    bodyElements: bodyElements.map((x, idx) => {
      return _react.default.createElement(KeyedComponent, {
        key: idx
      }, x);
    }),
    appBodyString: reactAppString || (0, _server.renderToStaticMarkup)(_react.default.createElement(_SplashScreen.default, null))
  });
};

var _default = getServerHTML;
exports.default = _default;