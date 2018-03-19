'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = customConfigs;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _utils = require('../internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customConfigs(_config) {
  // So incoming configs are not mutated
  const config = _extends({}, _config);

  // Dynamically requiring a module for both node and webpack.
  // const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;
  const customConfigPath = _path2.default.resolve(config.bluerainDir, 'expo.js');

  if (!_fs2.default.existsSync(customConfigPath)) {
    (0, _utils.log)({
      title: 'Configs',
      level: 'info',
      message: 'Using default configurations.'
    });
    return config;
  }

  console.log('customConfigPath', customConfigPath);
  const customConfig = require(customConfigPath).default; // eslint-disable-line
  console.log('customConfig', customConfig);

  if (typeof customConfig === 'function') {
    (0, _utils.log)({
      title: 'Configs',
      level: 'info',
      message: 'Loading custom configurations (full-control mode).'
    });
    return customConfig(config);
  }

  (0, _utils.log)({
    title: 'Configs',
    level: 'info',
    message: 'Loading custom configurations (extending mode).'
  });

  return (0, _deepmerge2.default)(config, customConfig);
}