'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _utils = require('../utils');

var _hotNodeServer = require('./hotNodeServer');

var _hotNodeServer2 = _interopRequireDefault(_hotNodeServer);

var _hotClientServer = require('./hotClientServer');

var _hotClientServer2 = _interopRequireDefault(_hotClientServer);

var _createVendorDLL = require('./createVendorDLL');

var _createVendorDLL2 = _interopRequireDefault(_createVendorDLL);

var _configFactory = require('../webpack/configFactory');

var _configFactory2 = _interopRequireDefault(_configFactory);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usesDevVendorDLL = bundleConfig => bundleConfig.devVendorDLL != null && bundleConfig.devVendorDLL.enabled;

const vendorDLLsFailed = err => {
  (0, _utils.log)({
    title: 'vendorDLL',
    level: 'error',
    message: 'Unfortunately an error occured whilst trying to build the vendor dll(s) used by the development server. Please check the console for more information.',
    notify: true
  });
  if (err) {
    console.error(err);
  }
};

const initializeBundle = (name, bundleConfig) => {
  const createCompiler = () => {
    try {
      const webpackConfig = (0, _configFactory2.default)({
        target: name,
        mode: 'development'
      });
      // Install the vendor DLL config for the client bundle if required.
      if (name === 'client' && usesDevVendorDLL(bundleConfig)) {
        // Install the vendor DLL plugin.
        webpackConfig.plugins.push(new _webpack2.default.DllReferencePlugin({
          // $FlowFixMe
          manifest: require((0, _path.resolve)((0, _config2.default)('projectRootDir'), bundleConfig.outputPath, `${bundleConfig.devVendorDLL.name}.json`))
        }));
      }
      return (0, _webpack2.default)(webpackConfig);
    } catch (err) {
      (0, _utils.log)({
        title: 'development',
        level: 'error',
        message: 'Webpack config is invalid, please check the console for more information.',
        notify: true
      });
      console.error(err);
      throw err;
    }
  };

  return { name, bundleConfig, createCompiler };
};

class HotDevelopment {
  constructor() {
    this.hotClientServer = null;
    this.hotNodeServers = [];

    const clientBundle = initializeBundle('client', (0, _config2.default)('bundles.client'));

    const nodeBundles = [initializeBundle('server', (0, _config2.default)('bundles.server'))].concat(Object.keys((0, _config2.default)('additionalNodeBundles')).map(name => initializeBundle(name, (0, _config2.default)('additionalNodeBundles')[name])));

    Promise.resolve(
    // First ensure the client dev vendor DLLs is created if needed.
    usesDevVendorDLL((0, _config2.default)('bundles.client')) ? (0, _createVendorDLL2.default)('client', (0, _config2.default)('bundles.client')) : true)
    // Then start the client development server.
    .then(() => new Promise(resolve => {
      const { createCompiler } = clientBundle;
      const compiler = createCompiler();
      compiler.plugin('done', stats => {
        if (!stats.hasErrors()) {
          resolve(compiler);
        }
      });
      this.hotClientServer = new _hotClientServer2.default(compiler);
    }), vendorDLLsFailed)
    // Then start the node development server(s).
    .then(clientCompiler => {
      this.hotNodeServers = nodeBundles.map(({ name, createCompiler }) =>
      // $FlowFixMe
      new _hotNodeServer2.default(name, createCompiler(), clientCompiler));
    });
  }

  dispose() {
    const safeDisposer = server => server ? server.dispose() : Promise.resolve();

    // First the hot client server.
    return safeDisposer(this.hotClientServer)
    // Then dispose the hot node server(s).
    .then(() => Promise.all(this.hotNodeServers.map(safeDisposer)));
  }
}

exports.default = HotDevelopment;