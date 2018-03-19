'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The is the HTML shell for our React Application.
 */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */

function HTML(props) {
  const { htmlAttributes, headerElements, bodyElements, appBodyString } = props;

  return _react2.default.createElement(
    'html',
    htmlAttributes,
    _react2.default.createElement(
      'head',
      null,
      headerElements
    ),
    _react2.default.createElement(
      'body',
      null,
      _react2.default.createElement('div', {
        id: 'app',
        className: 'app-container',
        dangerouslySetInnerHTML: { __html: appBodyString }
      }),
      bodyElements
    )
  );
}

HTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  htmlAttributes: _propTypes2.default.object,
  headerElements: _propTypes2.default.node,
  bodyElements: _propTypes2.default.node,
  appBodyString: _propTypes2.default.string
};

HTML.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: ''
};

// EXPORT

exports.default = HTML;