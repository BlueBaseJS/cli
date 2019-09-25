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
    target: 'node',
    mode: (0, _logic.isProduction)() ? 'production' : 'development',
    host: '0.0.0.0',
    port: 1338,
    welcomeMessage: 'Hello world!',
    disableSSR: false,
    browserCacheMaxAge: '365d',
    cspExtensions: {
      childSrc: [],
      connectSrc: [],
      defaultSrc: [],
      fontSrc: [],
      imgSrc: [],
      mediaSrc: [],
      objectSrc: [],
      scriptSrc: [],
      styleSrc: []
    },
    serviceWorker: {
      enabled: true,
      fileName: 'sw.js',
      includePublicAssets: [// NOTE: This will include ALL of our public folder assets.  We do
      // a glob pull of them and then map them to /foo paths as all the
      // public folder assets get served off the root of our application.
      // You may or may not want to be including these assets.  Feel free
      // to remove this or instead include only a very specific set of
      // assets.
      './**/*'],
      offlinePageFileName: 'offline.html'
    },
    // TODO:
    // extensions: [
    // 	'.web.ts', '.ts',
    // 	'.web.tsx', '.tsx',
    // 	'.web.js', '.js',
    // 	'.web.jsx', '.jsx'
    // ],
    extensions: ['ssr.ts', 'ts', 'tsx', 'js', 'jsx', 'json'],
    srcEntryFile: fromHere('../server/index'),
    includePaths: [args.configDir, (0, _paths.fromProjectRoot)('./src'), args.appJsPath // fromRoot('node_modules')
    // fromHere('../../server'),
    // fromHere('../../client/App'),
    ],
    outputPath: _path.default.join(args.buildDir, 'server'),
    nodeExternalsFileTypeWhitelist: [// /\.(eot|woff|woff2|ttf|otf)$/,
      // /\.(svg|png|jpg|jpeg|gif|ico)$/,
      // /\.(mp4|mp3|ogg|swf|webp)$/,
      // /\.(css|scss|sass|sss|less)$/,
    ]
  };
  return (0, _deepmerge.default)(input, configs);
};

exports.default = _default;