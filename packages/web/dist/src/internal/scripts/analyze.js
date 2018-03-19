'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _configFactory = require('../webpack/configFactory');

var _configFactory2 = _interopRequireDefault(_configFactory);

var _utils = require('../utils');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
/**
 * This script creates a webpack stats file on our production build of the
 * client bundle and then launches the webpack-bundle-analyzer tool allowing
 * you to easily see what is being included within your bundle.
 *
 * @see https://github.com/th0r/webpack-bundle-analyzer
 */

const [x, y, ...args] = process.argv;
const analyzeServer = args.findIndex(arg => arg === '--server') !== -1;
const analyzeClient = args.findIndex(arg => arg === '--client') !== -1;

let target;

if (analyzeServer) target = 'server';else if (analyzeClient) target = 'client';else throw new Error('Please specify --server OR --client as target');

const anaylzeFilePath = (0, _path.resolve)((0, _config2.default)('projectRootDir'), (0, _config2.default)('bundles.client.outputPath'), '__analyze__.json');

const clientCompiler = (0, _webpack2.default)((0, _configFactory2.default)({ target, optimize: true }));

clientCompiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    // Write out the json stats file.
    _fs2.default.writeFileSync(anaylzeFilePath, JSON.stringify(stats.toJson('verbose'), null, 4));

    // Run the bundle analyzer against the stats file.
    const cmd = `webpack-bundle-analyzer ${anaylzeFilePath} ${(0, _config2.default)('bundles.client.outputPath')}`;
    (0, _utils.exec)(cmd);
  }
});