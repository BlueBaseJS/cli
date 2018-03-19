'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Expo = function getExpoCli() {
  const bluerainExpoCliPath = _path2.default.resolve(__dirname, '../../../node_modules/.bin/exp');
  const targetExpoCliPath = 'node_modules/.bin/exp';
  return function whichExpoCli() {
    return _fs2.default.existsSync(targetExpoCliPath) ? targetExpoCliPath : bluerainExpoCliPath;
  };
}();

exports.default = Expo;