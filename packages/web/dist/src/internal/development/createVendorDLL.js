'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVendorDLL(bundleName, bundleConfig) {
  const dllConfig = (0, _config2.default)('bundles.client.devVendorDLL');

  // $FlowFixMe
  const pkg = require((0, _path.resolve)((0, _config2.default)('projectRootDir'), './package.json'));

  const devDLLDependencies = dllConfig.include.sort();

  // We calculate a hash of the package.json's dependencies, which we can use
  // to determine if dependencies have changed since the last time we built
  // the vendor dll.
  const currentDependenciesHash = (0, _md2.default)(JSON.stringify(devDLLDependencies.map(dep => [dep, pkg.dependencies[dep], pkg.devDependencies[dep]])
  // We do this to include any possible version numbers we may have for
  // a dependency. If these change then our hash should too, which will
  // result in a new dev dll build.
  ));

  const vendorDLLHashFilePath = (0, _path.resolve)((0, _config2.default)('projectRootDir'), bundleConfig.outputPath, `${dllConfig.name}_hash`);

  function webpackConfigFactory() {
    return {
      // We only use this for development, so lets always include source maps.
      devtool: 'inline-source-map',
      entry: {
        [dllConfig.name]: devDLLDependencies
      },
      output: {
        path: (0, _path.resolve)((0, _config2.default)('projectRootDir'), bundleConfig.outputPath),
        filename: `${dllConfig.name}.js`,
        library: dllConfig.name
      },
      plugins: [new _webpack2.default.DllPlugin({
        path: (0, _path.resolve)((0, _config2.default)('projectRootDir'), bundleConfig.outputPath, `./${dllConfig.name}.json`),
        name: dllConfig.name
      })]
    };
  }

  function buildVendorDLL() {
    return new Promise((resolve, reject) => {
      (0, _utils.log)({
        title: 'vendorDLL',
        level: 'info',
        message: `Vendor DLL build complete. The following dependencies have been included:\n\t-${devDLLDependencies.join('\n\t-')}\n`
      });

      const webpackConfig = webpackConfigFactory();
      const vendorDLLCompiler = (0, _webpack2.default)(webpackConfig);
      vendorDLLCompiler.run(err => {
        if (err) {
          reject(err);
          return;
        }
        // Update the dependency hash
        _fs2.default.writeFileSync(vendorDLLHashFilePath, currentDependenciesHash);

        resolve();
      });
    });
  }

  return new Promise((resolve, reject) => {
    if (!_fs2.default.existsSync(vendorDLLHashFilePath)) {
      // builddll
      (0, _utils.log)({
        title: 'vendorDLL',
        level: 'warn',
        message: `Generating a new "${bundleName}" Vendor DLL for boosted development performance.
The Vendor DLL helps to speed up your development workflow by reducing Webpack build times.  It does this by seperating Vendor DLLs from your primary bundles, thereby allowing Webpack to ignore them when having to rebuild your code for changes.  We recommend that you add all your client bundle specific dependencies to the Vendor DLL configuration (within /config).`
      });
      buildVendorDLL().then(resolve).catch(reject);
    } else {
      // first check if the md5 hashes match
      const dependenciesHash = _fs2.default.readFileSync(vendorDLLHashFilePath, 'utf8');
      const dependenciesChanged = dependenciesHash !== currentDependenciesHash;

      if (dependenciesChanged) {
        (0, _utils.log)({
          title: 'vendorDLL',
          level: 'warn',
          message: `New "${bundleName}" vendor dependencies detected. Regenerating the vendor dll...`
        });
        buildVendorDLL().then(resolve).catch(reject);
      } else {
        (0, _utils.log)({
          title: 'vendorDLL',
          level: 'info',
          message: `No changes to existing "${bundleName}" vendor dependencies. Using the existing vendor dll.`
        });
        resolve();
      }
    }
  });
}

exports.default = createVendorDLL;