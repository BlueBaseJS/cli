"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _forkTsCheckerWebpackPlugin = _interopRequireDefault(require("fork-ts-checker-webpack-plugin"));

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _useOwn = require("../../helpers/useOwn");

// tslint:disable-next-line:no-var-requires
const HappyPack = require('happypack');

const removeNil = _cliCore.Utils.removeNil;
/**
 * Javascript loader
 * @param config
 * @param builder
 */

const LoaderTypescript = () => (config, builder) => {
  const newConfig = (0, _webpackMerge.default)(config, {
    plugins: removeNil([// HappyPack 'typescript' instance.
    new HappyPack({
      id: 'happypack-typescript',
      verbose: false,
      threads: 4,
      loaders: [{
        loader: (0, _useOwn.useOwn)('babel-loader'),
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [(0, _useOwn.useOwn)('@bluebase/babel-preset-bluebase')]
        }
      }]
    }), // Typescript
    new _forkTsCheckerWebpackPlugin.default({
      checkSyntacticErrors: true
    })]) // module: {
    // 	rules: [
    // 		{
    // 			// "oneOf" will traverse all imports with following loaders until one will
    // 			// match the requirements. When no loader matches it will fallback to the
    // 			// "file" loader at the end of the loader list.
    // 			oneOf: removeNil([
    // 				// Typescript
    // 				{
    // 					test: /\.tsx?$/,
    // 					exclude: /node_modules/,
    // 					include: removeNil([
    // 						...builder.configs.srcPaths,
    // 						// ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
    // 					]),
    // 					loader: useOwn('happypack/loader?id=happypack-typescript')
    // 				},
    // 			]),
    // 		},
    // 	],
    // },

  });
  newConfig.module.rules[0].oneOf = [// Typescript
  {
    test: /\.(j|t)sx?$/,
    // exclude: /node_modules/,
    include: removeNil([...builder.configs.includePaths]),
    loader: (0, _useOwn.useOwn)('happypack/loader?id=happypack-typescript')
  }].concat(newConfig.module.rules[0].oneOf);
  return newConfig;
};

var _default = LoaderTypescript;
exports.default = _default;