"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fromHere = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _paths = require("@bluebase/cli-core/lib/utils/paths");

var _logic = require("@bluebase/cli-core/lib/utils/logic");

var _path = _interopRequireDefault(require("path"));

// tslint:disable:object-literal-sort-keys
const fromHere = file => {
  return _path.default.resolve(__dirname, file);
};

exports.fromHere = fromHere;

var _default = (input, args) => {
  const configs = {
    target: 'web',
    mode: (0, _logic.isProduction)() ? 'production' : 'development',
    devServerHost: '0.0.0.0',
    devServerPort: 1337,
    devDashboardEnable: true,
    devDashboardPort: 7332,
    htmlPage: {
      titleTemplate: 'BlueBase - %s',
      defaultTitle: 'BlueBase',
      description: 'A starter kit giving you the minimum requirements for a production ready universal react application.'
    },
    // TODO:
    // extensions: [
    // 	'.web.ts', '.ts',
    // 	'.web.tsx', '.tsx',
    // 	'.web.js', '.js',
    // 	'.web.jsx', '.jsx'
    // ],
    extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    bundleAssetsFileName: 'assets.json',
    srcEntryFile: fromHere('../client/index'),
    includePaths: [args.configDir, (0, _paths.fromProjectRoot)('./src')],
    outputPath: _path.default.join(args.buildDir, 'client'),
    publicPath: '/',
    includeSourceMapsForOptimisedBundle: false,
    nodeExternalsFileTypeWhitelist: [],
    // TODO add this in dir path
    favIconConfig: {
      // Your source logo
      logo: './assets/web/icon.png'
    },
    workBox: {
      config: {
        swDest: 'sw.js',
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets'
          }
        }, {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365
            }
          }
        }, {
          urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60
            }
          }
        }, {
          urlPattern: /\.(?:js|css)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources'
          }
        }]
      },
      disable: false // devVendorDLL: {
      // 	enabled: true,
      // 	include: [
      // 		'react',
      // 		'react-dom',
      // 		// 'react-helmet',
      // 		// 'react-router-dom',
      // 	],
      // 	name: '__dev_vendor_dll__',
      // },

    }
  };
  return (0, _deepmerge.default)(input, configs);
};

exports.default = _default;