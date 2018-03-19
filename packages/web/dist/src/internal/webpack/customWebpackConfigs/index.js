'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = customWebpackConfigs;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../../internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customWebpackConfigs(webpackConfig, buildOptions) {
  const customConfigPath = _path2.default.resolve((0, _config2.default)('bluerainDir'), 'webpack.config.js');

  if (!_fs2.default.existsSync(customConfigPath)) {
    (0, _utils.log)({
      title: 'Webpack',
      level: 'info',
      message: 'Using default webpack setup.'
    });
    return webpackConfig;
  }

  const customConfig = require(customConfigPath);

  if (typeof customConfig === 'function') {
    (0, _utils.log)({
      title: 'Webpack',
      level: 'info',
      message: 'Loading custom webpack config (full-control mode).'
    });
    return customConfig(webpackConfig, buildOptions);
  }

  (0, _utils.log)({
    title: 'Webpack',
    level: 'info',
    message: 'Loading custom webpack config (extending mode).'
  });

  return _extends({}, customConfig, webpackConfig, {
    // Override with custom devtool if provided
    devtool: customConfig.devtool || webpackConfig.devtool,
    // We need to use our and custom plugins.
    plugins: [...webpackConfig.plugins, ...(customConfig.plugins || [])],
    module: _extends({}, webpackConfig.module, customConfig.module, {
      rules: [...webpackConfig.module.rules, ...(customConfig.module && customConfig.module.rules || [])]
    }),
    resolve: _extends({}, webpackConfig.resolve, customConfig.resolve, {
      alias: _extends({}, webpackConfig.alias, customConfig.resolve && customConfig.resolve.alias)
    })
  });
}