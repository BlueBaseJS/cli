"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiredDevDependencies = exports.requiredDependencies = void 0;

var _cliCore = require("@bluebase/cli-core");

var _getLatestExpoVersion = require("./expo/getLatestExpoVersion");

/**
 * List of dependencies required by this plugin
 */
const requiredDependencies = [..._cliCore.requiredDependencies, 'deepmerge', '@bluebase/code-standards'];
/**
 * List of dev dependencies required by this plugin
 */

exports.requiredDependencies = requiredDependencies;
const requiredDevDependencies = [..._cliCore.requiredDevDependencies, '@types/deepmerge', 'schedule@0.4.0'];
exports.requiredDevDependencies = requiredDevDependencies;
const expoVersion = (0, _getLatestExpoVersion.getLatestExpoVersion)();
requiredDependencies.push(`expo@${expoVersion.expo}`);
requiredDependencies.push(`react@^${expoVersion.react}`);
requiredDependencies.push(`react-native@${expoVersion.reactNativeVersion}`);