"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findFile = findFile;

var _fs = _interopRequireDefault(require("fs"));

/**
 * Tries to file a given file with .js, .ts, .jsx & .tsx paths.
 * If none is found, returns backup. Otherwise returns the found path.
 * @param path
 * @param backup
 */
function findFile(path, backup) {
  let file = `${path}.js`;

  if (_fs.default.existsSync(file)) {
    return file;
  }

  file = `${path}.jsx`;

  if (_fs.default.existsSync(file)) {
    return file;
  }

  file = `${path}.ts`;

  if (_fs.default.existsSync(file)) {
    return file;
  }

  file = `${path}.tsx`;

  if (_fs.default.existsSync(file)) {
    return file;
  }

  return backup;
}