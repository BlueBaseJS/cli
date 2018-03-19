'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.happyPackPlugin = happyPackPlugin;
exports.log = log;
exports.exec = exec;

var _happypack = require('happypack');

var _happypack2 = _interopRequireDefault(_happypack);

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _child_process = require('child_process');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
function happyPackPlugin({ name, loaders }) {
  return new _happypack2.default({
    id: name,
    verbose: false,
    threads: 4,
    loaders
  });
}

function log(options) {
  const title = `${options.title.toUpperCase()}`;

  if (options.notify) {
    _nodeNotifier2.default.notify({
      title,
      message: options.message
    });
  }

  const level = options.level || 'info';
  const msg = `${title}: ${options.message}`;

  switch (level) {
    case 'warn':
      console.log(_safe2.default.yellow(msg));
      break;
    case 'error':
      console.log(_safe2.default.bgRed.white(msg));
      break;
    case 'special':
      console.log(_safe2.default.italic.cyan(msg));
      break;
    case 'info':
    default:
      console.log(_safe2.default.green.dim(msg));
  }
}

function exec(command) {
  (0, _child_process.execSync)(command, { stdio: 'inherit', cwd: (0, _config2.default)('projectRootDir') });
}