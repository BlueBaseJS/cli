'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(filePath, ext, content) {
  _fs2.default.writeFileSync(filePath, ext === 'json' ? JSON.stringify(content) : content);
}