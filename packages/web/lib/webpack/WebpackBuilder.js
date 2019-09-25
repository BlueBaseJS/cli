"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cliCore = require("@bluebase/cli-core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

// tslint:disable:max-line-length
class WebpackBuilder {
  /** Path of the boot options file (boot.js) */
  ////////////////////////////
  ////// Configurations //////
  ////////////////////////////
  ///////////////////////
  ////// Constants //////
  ///////////////////////

  /** Is this production enviornment? */

  /** Is this development enviornment? */

  /** Is this a client build? */

  /** Is this a server build? */

  /** Is this a node enviornment? */
  //////////////////////////
  ////// Conditionals //////
  //////////////////////////
  // Preconfigure some ifElse helper instnaces. See the util docs for more
  // information on how this util works.

  /** Execute if enviornment is development. */

  /** Execute if enviornment is production. */

  /** Execute if enviornment is node. */

  /** Execute if enviornment is client. */

  /** Execute if enviornment is development client. */

  /** Execute if enviornment is production client. */
  ///////////////////////////
  ////// Path Builders //////
  ///////////////////////////
  constructor(buildOptions, webpackConfig = {}) {
    this.webpackConfig = webpackConfig;
    (0, _defineProperty2.default)(this, "bluebaseJsPath", void 0);
    (0, _defineProperty2.default)(this, "appJsPath", void 0);
    (0, _defineProperty2.default)(this, "assetsDir", void 0);
    (0, _defineProperty2.default)(this, "buildDir", void 0);
    (0, _defineProperty2.default)(this, "configDir", void 0);
    (0, _defineProperty2.default)(this, "configs", void 0);
    (0, _defineProperty2.default)(this, "isProd", void 0);
    (0, _defineProperty2.default)(this, "isDev", void 0);
    (0, _defineProperty2.default)(this, "isClient", void 0);
    (0, _defineProperty2.default)(this, "isServer", void 0);
    (0, _defineProperty2.default)(this, "isNode", void 0);
    (0, _defineProperty2.default)(this, "ifDev", void 0);
    (0, _defineProperty2.default)(this, "ifProd", void 0);
    (0, _defineProperty2.default)(this, "ifNode", void 0);
    (0, _defineProperty2.default)(this, "ifClient", void 0);
    (0, _defineProperty2.default)(this, "ifDevClient", void 0);
    (0, _defineProperty2.default)(this, "ifProdClient", void 0);
    const {
      appJsPath,
      assetsDir,
      buildDir,
      configDir,
      configs,
      bluebaseJsPath
    } = buildOptions;

    if (!configs) {
      throw Error(`No bundle configuration given to WebpackBuilder.`);
    }

    this.configs = (0, _objectSpread2.default)({}, configs);
    const isProd = _cliCore.Utils.isProduction() ? 'production' : 'development';
    this.configs.mode = configs.mode || isProd;
    this.configs.target = configs.target || 'web';
    const ifElse = _cliCore.Utils.ifElse; // Init

    this.appJsPath = appJsPath;
    this.assetsDir = assetsDir;
    this.bluebaseJsPath = bluebaseJsPath;
    this.buildDir = buildDir;
    this.configs = configs;
    this.configDir = configDir; // Path helpers

    this.isProd = this.configs.mode === 'production' ? true : false;
    this.isDev = !this.isProd;
    this.isClient = this.configs.target !== 'node';
    this.isServer = !this.isClient;
    this.isNode = !this.isClient; // this.isElectron = this.configs.target === 'electron';
    // Conditionals

    this.ifDev = ifElse(this.isDev);
    this.ifProd = ifElse(this.isProd);
    this.ifNode = ifElse(this.isNode);
    this.ifClient = ifElse(this.isClient);
    this.ifDevClient = ifElse(this.isDev && this.isClient);
    this.ifProdClient = ifElse(this.isProd && this.isClient);
  }
  /**
   * Build a webpack config
   * @param webpackConfigInput
   */


  build() {
    return this.webpackConfig;
  }
  /**
   * Use a middleware. A middleware is a function that returns a merged
   * webpack config
   * @param middleware
   */


  use(middleware) {
    this.webpackConfig = middleware(this.webpackConfig, this);
    return this;
  }
  /**
   * Merge a webpack config
   * @param config
   */


  merge(config) {
    this.webpackConfig = (0, _webpackMerge.default)(this.webpackConfig, config);
    return this;
  }

}

exports.default = WebpackBuilder;