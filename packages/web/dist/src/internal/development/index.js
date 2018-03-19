'use strict';

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path = require('path');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let HotDevelopment = require('./hotDevelopment').default;
let devServer = new HotDevelopment();

// Any changes to our webpack bundleConfigs should restart the development devServer.
const watcher = _chokidar2.default.watch([(0, _path.resolve)((0, _config2.default)('projectRootDir'), 'internal'), (0, _path.resolve)((0, _config2.default)('projectRootDir'), 'config')]);

watcher.on('ready', () => {
  watcher.on('change', () => {
    (0, _utils.log)({
      title: 'webpack',
      level: 'warn',
      message: 'Project build configuration has changed. Restarting the development devServer...'
    });
    devServer.dispose().then(() => {
      // Make sure our new webpack bundleConfigs aren't in the module cache.
      Object.keys(require.cache).forEach(modulePath => {
        if (modulePath.indexOf('config') !== -1) {
          delete require.cache[modulePath];
        } else if (modulePath.indexOf('internal') !== -1) {
          delete require.cache[modulePath];
        }
      });

      // Re-require the development devServer so that all new configs are used.
      HotDevelopment = require('./hotDevelopment').default;

      // Create a new development devServer.
      devServer = new HotDevelopment();
    });
  });
});

// If we receive a kill cmd then we will first try to dispose our listeners.
process.on('SIGTERM', () => devServer && devServer.dispose().then(() => process.exit(0)));