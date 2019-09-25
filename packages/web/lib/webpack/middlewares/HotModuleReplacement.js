"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _useOwn = require("../../helpers/useOwn");

// import { Utils } from '@bluebase/cli-core';
// const removeNil = Utils.removeNil;
const HotModuleReplacement = () => (config, _builder) => {
  return _webpackMerge.default.strategy({
    entry: 'prepend',
    // or 'replace', defaults to 'append'
    'entry.index': 'prepend'
  })(config, {
    // entry: {
    // 	index: removeNil([
    // 		// Extends hot reloading with the ability to hot path React Components.
    // 		// This should always be at the top of your entries list. Only put
    // 		// polyfills above it.
    // 		builder.ifDevClient(useOwn('react-hot-loader/patch')),
    // 		// Required to support hot reloading of our client.
    // 		builder.ifDevClient(
    // 			() =>
    // 				`${useOwn('webpack-hot-middleware/client')}?reload=true`,
    // 				// tslint:disable-next-line:max-line-length
    // 				// `${useOwn('webpack-hot-middleware/client')}?reload=true&path=http:
    // //${builder.configs.host}:${builder.configs.clientDevServerPort}/__webpack_hmr`,
    // 		),
    // 	])
    // },
    // plugins: removeNil([
    // 	// We need this plugin to enable hot reloading of our client.
    // 	builder.ifDevClient(() => new HotModuleReplacementPlugin({
    // 		// multiStep: true,
    // 	})),
    // ]),
    resolve: {
      alias: {
        'react-hot-loader': (0, _useOwn.useOwn)('react-hot-loader'),
        'webpack-hot-client': (0, _useOwn.useOwn)('webpack-hot-client')
      }
    }
  });
};

var _default = HotModuleReplacement;
exports.default = _default;