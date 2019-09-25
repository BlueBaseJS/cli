"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = require("webpack");

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

const ifElse = _cliCore.Utils.ifElse;
const removeNil = _cliCore.Utils.removeNil;
/**
 * Add source map support
 * @param config
 * @param builder
 */

const SourceMaps = () => (config, builder) => {
  return (0, _webpackMerge.default)(config, {
    // Source map settings.
    devtool: ifElse( // Include source maps for ANY node bundle so that we can support
    // nice stack traces for errors (the source maps get consumed by
    // the `node-source-map-support` module to allow for this).
    builder.isNode || // Always include source maps for any development build.
    builder.isDev || // Allow for the following flag to force source maps even for production
    // builds.
    builder.configs.includeSourceMapsForOptimisedClientBundle)( // Produces an external source map (lives next to bundle output files).
    'source-map', // Produces no source map.
    'hidden-source-map'),
    plugins: removeNil([// This grants us source map support, which combined with our webpack
    // source maps will give us nice stack traces for our node executed
    // bundles.
    // We use the BannerPlugin to make sure all of our chunks will get the
    // source maps support installed.
    builder.ifNode(() => new _webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true
    }))])
  });
};

var _default = SourceMaps;
exports.default = _default;