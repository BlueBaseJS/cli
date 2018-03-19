'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = customBabelConfigs;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../../internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customBabelConfigs(babelConfig, buildOptions) {
  let customBabelConfig;
  const babelConfigPath = _path2.default.resolve((0, _config2.default)('bluerainDir'), '.babelrc');

  if (_fs2.default.existsSync(babelConfigPath)) {
    const content = _fs2.default.readFileSync(babelConfigPath, 'utf-8');
    try {
      customBabelConfig = _json2.default.parse(content);
      customBabelConfig.babelrc = false;
      (0, _utils.log)({
        title: 'Babel',
        level: 'info',
        message: 'Loading custom .babelrc'
      });
    } catch (e) {
      (0, _utils.log)({
        title: 'Babel',
        level: 'error',
        message: `Error parsing .babelrc file: ${e.message}`
      });
      throw e;
    }
  }

  if (!customBabelConfig) {
    return (0, _config2.default)('plugins.babelConfig')(babelConfig, buildOptions);
  }

  return customBabelConfig;
}