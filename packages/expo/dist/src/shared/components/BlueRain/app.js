'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bluerainOs = require('@blueeast/bluerain-os');

var _bluerainOs2 = _interopRequireDefault(_bluerainOs);

var _BLUERAIN_BOOT_OPTIONS = require('BLUERAIN_BOOT_OPTIONS');

var _BLUERAIN_BOOT_OPTIONS2 = _interopRequireDefault(_BLUERAIN_BOOT_OPTIONS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line

// Execute the first render of our app.
const app = _bluerainOs2.default.boot(_extends({}, _BLUERAIN_BOOT_OPTIONS2.default, { renderApp: false }));

exports.default = app;