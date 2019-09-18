"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCleanDir = createCleanDir;

var _fs = _interopRequireDefault(require("fs"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _shelljs = _interopRequireDefault(require("shelljs"));

/**
 * If the dir exists, deletes it. Then creates a new dir.
 * @param path
 */
function createCleanDir(path) {
  // Delete dir if already exists
  if (_fs.default.existsSync(path)) {
    _rimraf.default.sync(path);
  } // Create a new build dir


  _shelljs.default.mkdir('-p', path);
}