'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _HTML = require('../../../shared/components/HTML');

var _HTML2 = _interopRequireDefault(_HTML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function generate(context) {
  // const config = context.htmlWebpackPlugin.options.custom.config;
  const ClientConfig = context.htmlWebpackPlugin.options.custom.ClientConfig;
  const html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_HTML2.default, { bodyElements: _react2.default.createElement(ClientConfig, { nonce: 'OFFLINE_PAGE_NONCE_PLACEHOLDER' }) }));
  return `<!DOCTYPE html>${html}`;
}; /**
    * This is used by the HtmlWebpackPlugin to generate an html page that we will
    * use as a fallback for our service worker when the user is offline.  It will
    * embed all the required asset paths needed to bootstrap the application
    * in an offline session.
    */