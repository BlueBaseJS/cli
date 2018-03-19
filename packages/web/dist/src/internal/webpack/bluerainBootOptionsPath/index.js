'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  const customFilePath = _path2.default.resolve((0, _config2.default)('bluerainDir'), (0, _config2.default)('bluerainJsFile'));

  if (_fs2.default.existsSync(customFilePath)) {
    (0, _utils.log)({
      title: 'BlueRain Server',
      level: 'info',
      message: `Loading custom bluerain.js file from: ${customFilePath}`
    });

    return customFilePath;
  }

  (0, _utils.log)({
    title: 'BlueRain Server',
    level: 'info',
    message: 'Loading default bluerain.js file'
  });

  return _path2.default.resolve(__dirname, '../../../shared/components/BlueRain/bluerain.js');
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../../internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }