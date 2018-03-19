'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _configFactory = require('../webpack/configFactory');

var _configFactory2 = _interopRequireDefault(_configFactory);

var _utils = require('../utils');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
const [x, y, ...args] = process.argv; /**
                                       * This script builds a production output of all of our bundles.
                                       */

const optimize = args.findIndex(arg => arg === '--optimize') !== -1;

// First clear the build output dir.
(0, _utils.exec)(`rimraf ${(0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('buildOutputPath'))}`);

// Get our "fixed" bundle names
Object.keys((0, _config2.default)('bundles'))
// And the "additional" bundle names
.concat(Object.keys((0, _config2.default)('additionalNodeBundles')))
// And then build them all.
.forEach(bundleName => {
  const compiler = (0, _webpack2.default)((0, _configFactory2.default)({ target: bundleName, optimize }));
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stats.toString({ colors: true }));
  });
});