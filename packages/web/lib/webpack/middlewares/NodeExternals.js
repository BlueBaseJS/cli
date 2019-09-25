"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _cliCore = require("@bluebase/cli-core");

var _utils = require("@bluebase/cli-core/lib/utils");

var _fromRoot = require("../../helpers/fromRoot");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _webpackNodeExternals = _interopRequireDefault(require("webpack-node-externals"));

const removeNil = _cliCore.Utils.removeNil;
/**
 * We don't want our node_modules to be bundled with any bundle that is
 * targetting the node environment, prefering them to be resolved via
 * native node module system. Therefore we use the `webpack-node-externals`
 * library to help us generate an externals configuration that will
 * ignore all the node_modules.
 * @param config
 * @param builder
 */

const NodeExternals = (options = {}) => (config, builder) => {
  return (0, _webpackMerge.default)(config, {
    // externals: externalsConfig(builder.isServer, 'node'),
    externals: [(0, _webpackNodeExternals.default)( // Some of our node_modules may contain files that depend on our
    // webpack loaders, e.g. CSS or SASS.
    // For these cases please make sure that the file extensions are
    // registered within the following configuration setting.
    (0, _objectSpread2.default)({
      // Modules dir
      modulesDir: (0, _fromRoot.fromRoot)('./node_modules'),
      // modulesFromFile: {
      // 	exclude: ['devDependencies'],
      // 	include: ['dependencies']
      // } as any,
      whitelist: removeNil([// We always want the source-map-support included in
      // our node target bundles.
      'source-map-support/register', // Since the CLI maybe installed globally, the dependencies
      // of these repo may not be available in project modules
      // So, we're not excluding them.
      ...getDependenciesRecursive('@bluebase/cli-core'), ...getDependenciesRecursive('express'), ...getDependenciesRecursive('react-helmet'), ...getDependenciesRecursive('react-native-web'), ...getDependenciesRecursive('react-art'), ...getDependenciesRecursive('helmet'), ...getDependenciesRecursive('hpp'), // We want to add project's dependencies too
      // because they may need the react-native alias
      ...getDependenciesRecursive('@bluebase/core'), ...getDependenciesRecursive((0, _utils.fromProjectRoot)(), ['expo', 'react-native'])]) // And any items that have been whitelisted in the config need
      // to be included in the bundling process too.
      .concat(builder.configs.nodeExternalsFileTypeWhitelist || [])
    }, options))]
  });
};

function getDependenciesRecursive(_package, skip = []) {
  const list = [];

  function run(pkg) {
    let pkgJson;

    try {
      pkgJson = require(`${pkg}/package.json`);
    } catch (error) {
      return;
    }

    const name = pkgJson.name;

    if (!name) {
      return;
    } // This package is already processed, skip!


    if (list.indexOf(name) !== -1) {
      return;
    } // The package is in skip list


    if (skip.indexOf(name) !== -1) {
      return;
    }

    const dependencies = Object.keys(pkgJson.dependencies || {});
    list.push(name);
    dependencies.forEach(dep => {
      run(dep);
    });
  }

  run(_package);
  return list.map(dep => new RegExp(`^${dep}`, 'i'));
}

var _default = NodeExternals;
exports.default = _default;