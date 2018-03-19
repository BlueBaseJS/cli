'use strict';

var _path = require('path');

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clean() {
  (0, _rimraf2.default)((0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('buildOutputPath')), () => {
    console.log(`Cleaned ${(0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('buildOutputPath'))}`);
  });
} /**
   * This script removes any exisitng build output.
   */

clean();