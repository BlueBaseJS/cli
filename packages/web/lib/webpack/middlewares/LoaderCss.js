"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _useOwn = require("../../helpers/useOwn");

// tslint:disable-next-line:no-var-requires
const HappyPack = require('happypack');

const removeNil = _cliCore.Utils.removeNil; // const ifElse = Utils.ifElse;
// const removeNil = Utils.removeNil;

/**
 * Javascript loader
 * @param config
 * @param builder
 */

const LoaderCss = () => (config, builder) => {
  const newConfig = (0, _webpackMerge.default)(config, {
    plugins: removeNil([// HappyPack 'css' instance for development client.
    builder.ifDevClient(() => new HappyPack({
      id: 'happypack-devclient-css',
      verbose: false,
      // tslint:disable-next-line:object-literal-sort-keys
      threads: 4,
      loaders: [(0, _useOwn.useOwn)('style-loader'), {
        path: (0, _useOwn.useOwn)('css-loader'),
        // Include sourcemaps for dev experience++.
        query: {
          sourceMap: true
        }
      }]
    })), // For the production build of the client we need to extract the CSS into
    // CSS files.
    builder.ifProdClient(() => new _miniCssExtractPlugin.default({
      chunkFilename: builder.ifDev('[id].css', '[id].[hash].css'),
      filename: builder.ifDev('[name].css', '[name].[hash].css')
    }))]) // module: {
    // 	rules: [
    // 		{
    // 			// "oneOf" will traverse all imports with following loaders until one will
    // 			// match the requirements. When no loader matches it will fallback to the
    // 			// "file" loader at the end of the loader list.
    // 			oneOf: removeNil([
    // 				// CSS
    // 				// This is bound to our server/client bundles as we only expect to be
    // 				// serving the client bundle as a Single Page Application through the
    // 				// server.
    // 				ifElse(builder.isClient || builder.isServer)(
    // 					Utils.mergeDeep(
    // 						{
    // 							test: /\.css$/,
    // 						},
    // 						// For development clients we will defer all our css processing to the
    // 						// happypack plugin named "happypack-devclient-css".
    // 						// See the respective plugin within the plugins section for full
    // 						// details on what loader is being implemented.
    // 						builder.ifDevClient({
    // 							loaders: [
    // 								// 'happypack/loader?id=happypack-devclient-css',
    // 								{
    // 									loader: useOwn('happypack/loader'),
    // 									query: 'id=happypack-devclient-css',
    // 								},
    // 							],
    // 						}),
    // 						// For a production client build we use the ExtractTextPlugin which
    // 						// will extract our CSS into CSS files. We don't use happypack here
    // 						// as there are some edge cases where it fails when used within
    // 						// an ExtractTextPlugin instance.
    // 						// Note: The ExtractTextPlugin needs to be registered within the
    // 						// plugins section too.
    // 						builder.ifProdClient(() => ({
    // 							loaders: [
    // 								MiniCssExtractPlugin.loader,
    // 								useOwn('css-loader')
    // 							]
    // 						})),
    // 						// When targetting the server we use the "/locals" version of the
    // 						// css loader, as we don't need any css files for the server.
    // 						builder.ifNode({
    // 							loaders: [useOwn('css-loader/locals')],
    // 						}),
    // 					),
    // 				),
    // 			]),
    // 		},
    // 	],
    // },

  });

  if (builder.isClient || builder.isServer) {
    newConfig.module.rules[0].oneOf = [_cliCore.Utils.mergeDeep({
      test: /\.css$/
    }, // For development clients we will defer all our css processing to the
    // happypack plugin named "happypack-devclient-css".
    // See the respective plugin within the plugins section for full
    // details on what loader is being implemented.
    builder.ifDevClient({
      loaders: [// 'happypack/loader?id=happypack-devclient-css',
      {
        loader: (0, _useOwn.useOwn)('happypack/loader'),
        query: 'id=happypack-devclient-css'
      }]
    }), // For a production client build we use the ExtractTextPlugin which
    // will extract our CSS into CSS files. We don't use happypack here
    // as there are some edge cases where it fails when used within
    // an ExtractTextPlugin instance.
    // Note: The ExtractTextPlugin needs to be registered within the
    // plugins section too.
    builder.ifProdClient(() => {
      return {
        loaders: [_miniCssExtractPlugin.default.loader, (0, _useOwn.useOwn)('css-loader')]
      };
    }), // When targetting the server we use the "/locals" version of the
    // css loader, as we don't need any css files for the server.
    builder.ifNode({
      loaders: [(0, _useOwn.useOwn)('css-loader/locals')]
    }))].concat(newConfig.module.rules[0].oneOf);
  }

  return newConfig;
};

var _default = LoaderCss;
exports.default = _default;