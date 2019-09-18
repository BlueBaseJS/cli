"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpoSdk = void 0;

var _cliCore = require("@bluebase/cli-core");

var _expoVersions = require("./expoVersions");

var _fs = _interopRequireDefault(require("fs"));

var _semver = _interopRequireDefault(require("semver"));

/**
 * Check the version of expo installed in package.json and return the relevant
 * sdk version to use in app.json
 */
const getExpoSdk = () => {
  const Package = _fs.default.readFileSync(_cliCore.Utils.fromProjectRoot('node_modules/expo/package.json'));

  const expoVersion = JSON.parse(Package.toString()).version;

  if (!expoVersion) {
    throw Error('⛔️ Expo is not installed.');
  }

  const sdk = _expoVersions.expoVersions.find(expoVerObj => _semver.default.satisfies(expoVersion, expoVerObj.expo));

  if (!sdk) {
    throw Error('⛔️ Unsupported expo version.');
  }

  return sdk.sdkVersion;
};

exports.getExpoSdk = getExpoSdk;