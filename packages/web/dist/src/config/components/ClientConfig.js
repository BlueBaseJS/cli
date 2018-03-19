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

var _filterWithRules = require('../../shared/utils/objects/filterWithRules');

var _filterWithRules2 = _interopRequireDefault(_filterWithRules);

var _configFactory = require('../configFactory');

var _configFactory2 = _interopRequireDefault(_configFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const values = (0, _configFactory2.default)();

// Filter the config down to the properties that are allowed to be included
// in the HTML response.
const clientConfig = (0, _filterWithRules2.default)(
// These are the rules used to filter the config.
values.clientConfigFilter,
// The config values to filter.
values);

const serializedClientConfig = (0, _serializeJavascript2.default)(clientConfig);

/**
 * A react component that generates a script tag that binds the allowed
 * values to the window so that config values can be read within the
 * browser.
 *
 * They get bound to window.__CLIENT_CONFIG__
 */
function ClientConfig({ nonce }) {
  return _react2.default.createElement('script', {
    type: 'text/javascript',
    nonce: nonce
    // eslint-disable-next-line react/no-danger
    , dangerouslySetInnerHTML: {
      __html: `window.__CLIENT_CONFIG__=${serializedClientConfig}`
    }
  });
}

ClientConfig.propTypes = {
  nonce: _propTypes2.default.string.isRequired
};

exports.default = ClientConfig;