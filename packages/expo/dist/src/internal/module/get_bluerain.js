'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Bluerain = function getBlueRainJS() {
  const customBluerainJS = _path2.default.resolve((0, _config2.default)('bluerainDir'), 'bluerain.js');
  return function whichBlueRainJS() {
    if (_fs2.default.existsSync(customBluerainJS)) {
      (0, _utils.log)({
        title: 'Bluerain',
        level: 'info',
        message: 'Loading custom bluerain'
      });
      return customBluerainJS;
    }

    (0, _utils.log)({
      title: 'Bluerain',
      level: 'info',
      message: 'Loading default bluerain'
    });

    return _path2.default.resolve(__dirname, '../../config/default/bluerain.js');
  };
}();

exports.default = Bluerain;