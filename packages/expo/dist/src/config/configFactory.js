'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Project Configuration.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * NOTE: All file/folder paths should be relative to the project root. The
                                                                                                                                                                                                                                                                   * absolute paths should be resolved during runtime by our build internal/server.
                                                                                                                                                                                                                                                                   */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appRootDir = require('app-root-dir');

var _appRootDir2 = _interopRequireDefault(_appRootDir);

var _projectRootDir = require('./projectRootDir');

var _projectRootDir2 = _interopRequireDefault(_projectRootDir);

var _customConfigs = require('./customConfigs');

var _customConfigs2 = _interopRequireDefault(_customConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configFactory = configs => (0, _customConfigs2.default)(_extends({
  projectRootDir: _projectRootDir2.default,

  // Location of root directory of app
  appRootDir: _path2.default.resolve(_appRootDir2.default.get()),

  // Location of bluerain directory in the project
  bluerainDir: _path2.default.resolve(_appRootDir2.default.get(), 'bluerain'),

  // path to babel compiler
  expoCli: 'node_modules/.bin/exp',

  // Src folder path in consumer app
  srcAppDir: _path2.default.resolve(_appRootDir2.default.get(), 'src'),

  // Output dist path in consumer app
  outputExpoDir: _path2.default.resolve(_appRootDir2.default.get(), 'expo'),

  // Expo default conifgurations
  expo: {
    name: 'Bluerain',
    slug: 'bluerain'
  }

}, configs));

// This protects us from accidentally including this configuration in our
// client bundle. That would be a big NO NO to do. :)
if (process.env.BUILD_FLAG_IS_CLIENT === 'true') {
  throw new Error("You shouldn't be importing the `<projectroot>/config/values.js` directly into code that will be included in your 'client' bundle as the configuration object will be sent to user's browsers. This could be a security risk! Instead, use the `config` helper function located at `<projectroot>/config/index.js`.");
}

exports.default = configFactory;