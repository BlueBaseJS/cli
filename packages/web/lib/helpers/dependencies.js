"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiredDevDependencies = exports.requiredDependencies = void 0;

var _cliCore = require("@bluebase/cli-core");

/**
 * List of dependencies required by this plugin
 */
const requiredDependencies = [..._cliCore.requiredDependencies, 'deepmerge', 'react-dom@^16.4.2', '@babel/core', 'source-map-support', '@babel/runtime', 'uuid', 'compression', 'metro-react-native-babel-preset'];
/**
 * List of dev dependencies required by this plugin
 */

exports.requiredDependencies = requiredDependencies;
const requiredDevDependencies = [..._cliCore.requiredDevDependencies, '@bluebase/babel-preset-bluebase', '@types/deepmerge', '@types/source-map-support', '@types/uuid', '@types/compression'];
exports.requiredDevDependencies = requiredDevDependencies;