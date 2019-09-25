"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackCompileDev = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _cliCore = require("@bluebase/cli-core");

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _webpackServe = _interopRequireDefault(require("webpack-serve"));

// tslint:disable-next-line:no-var-requires
const history = require('connect-history-api-fallback'); // tslint:disable-next-line:no-var-requires


const convert = require('koa-connect');
/**
 * compiles a webpack config.
 * @param configs
 */


const webpackCompileDev = async (configs, label) => {
  const defaultConfigs = {
    // open: true,
    devMiddleware: {
      publicPath: '/',
      writeToDisk: true
    },
    add: app => {
      const historyOptions = {// ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };
      app.use(convert(history(historyOptions)));
    },
    on: {
      'build-finished': () => {
        _cliCore.Utils.logger.log({
          label,
          level: 'info',
          message: 'Running with latest changes.',
          notify: true
        });
      },
      'compiler-error': () => {
        _cliCore.Utils.logger.log({
          label,
          level: 'error',
          message: 'Build failed, please check the console for more information.',
          notify: true
        });
      }
    }
  };
  const mergedConfigs = (0, _objectSpread2.default)({}, (0, _deepmerge.default)(defaultConfigs, configs), {
    // If we rely on deepmerge, webpack messes up
    config: configs.config
  });
  return (0, _webpackServe.default)({}, mergedConfigs);
};

exports.webpackCompileDev = webpackCompileDev;