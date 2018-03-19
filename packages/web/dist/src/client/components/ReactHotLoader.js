'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We create this wrapper so that we only import react-hot-loader for a
// development build.  Small savings. :)
const ReactHotLoader = process.env.NODE_ENV === 'development' ? require('react-hot-loader').AppContainer : ({ children }) => _react2.default.Children.only(children); /* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

exports.default = ReactHotLoader;