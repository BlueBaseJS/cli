"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var WebpackTools = _interopRequireWildcard(require("../webpack"));

var _default = (webpackConfigInput = {}, buildOptions) => {
  const builder = new WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
  const configs = builder // Base Config
  .use(WebpackTools.BaseConfig()) // favIcon plugin
  .use(WebpackTools.FavIcon()) // Hot Module Replacement
  .use(WebpackTools.HotModuleReplacement()) // Source Maps
  .use(WebpackTools.SourceMaps()) // Patch React Native
  .use(WebpackTools.ReactNative()) // Generate assets.json
  .use(WebpackTools.AssetsJson()) ///// Loaders
  // CSS Loader
  .use(WebpackTools.LoaderCss()) // TS Loader
  .use(WebpackTools.LoaderTypescript()) // Finally, merge user input overrides
  .merge(webpackConfigInput);

  if (!buildOptions.configs.workBox.disable) {
    configs.use(WebpackTools.WorkBox());
  }

  if (buildOptions.static === true) {
    configs.use(WebpackTools.ClientHTML());
  }

  if (buildOptions.configs.devDashboardEnable === true) {
    configs.use(WebpackTools.Jarvis(buildOptions.configs.devDashboardPort));
  }

  return configs.build();
};

exports.default = _default;