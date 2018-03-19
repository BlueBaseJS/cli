'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAppJson;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _create_file = require('./create_file');

var _create_file2 = _interopRequireDefault(_create_file);

var _config = require('../../config/');

var _config2 = _interopRequireDefault(_config);

var _get_bluerain = require('./get_bluerain');

var _get_bluerain2 = _interopRequireDefault(_get_bluerain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAppJson(filename) {
  let $content = {};
  const $config = (0, _config2.default)('expo');

  function $createAppJsonContent() {
    const packageJson = require(_path2.default.resolve((0, _config2.default)('appRootDir'), 'package.json')) || {};
    const {
      devDependencies: {
        expo: devDepExpo = '25.0.0'
      } = {},
      dependencies: {
        expo: sdkVersion = devDepExpo
      } = {},
      version: packageJsonVersion
    } = packageJson;

    const {
      name,
      slug,
      version = packageJsonVersion
    } = $config;

    const { config: bluerainConfig } = require((0, _get_bluerain2.default)()).default;

    $content = {
      expo: {
        name,
        slug,
        sdkVersion: sdkVersion.replace(/(\^~)/, ''),
        version,
        description: $config.description,
        loading: $config.loading || bluerainConfig.loading
      }
    };
  }

  function $generate() {
    $createAppJsonContent();
    console.log($content);
    (0, _create_file2.default)(_path2.default.join((0, _config2.default)('appRootDir'), filename), 'json', $content);
  }

  return {
    generate: $generate
  };
}