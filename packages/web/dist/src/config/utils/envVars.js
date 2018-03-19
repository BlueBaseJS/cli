'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.string = string;
exports.number = number;
exports.bool = bool;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ifElse = require('../../shared/utils/logic/ifElse');

var _ifElse2 = _interopRequireDefault(_ifElse);

var _removeNil = require('../../shared/utils/arrays/removeNil');

var _removeNil2 = _interopRequireDefault(_removeNil);

var _projectRootDir = require('../projectRootDir');

var _projectRootDir2 = _interopRequireDefault(_projectRootDir);

var _utils = require('../../internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PRIVATES

function registerEnvFile() {
  const DEPLOYMENT = process.env.DEPLOYMENT;
  const envFile = '.env';

  // This is the order in which we will try to resolve an environment configuration
  // file.
  const envFileResolutionOrder = (0, _removeNil2.default)([
  // Is there an environment config file at the app root?
  // This always takes preference.
  // e.g. /projects/react-universally/.env
  _path2.default.resolve(_projectRootDir2.default, envFile),
  // Is there an environment config file at the app root for our target
  // environment name?
  // e.g. /projects/react-universally/.env.staging
  (0, _ifElse2.default)(DEPLOYMENT)(_path2.default.resolve(_projectRootDir2.default, `${envFile}.${DEPLOYMENT}`))]);

  // Find the first env file path match.
  const envFilePath = envFileResolutionOrder.find(filePath => _fs2.default.existsSync(filePath));

  // If we found an env file match the register it.
  if (envFilePath) {
    // eslint-disable-next-line no-console
    (0, _utils.log)({
      title: 'server',
      level: 'special',
      message: `Registering environment variables from: ${envFilePath}`
    });
    _dotenv2.default.config({ path: envFilePath });
  }
}

// Ensure that we first register any environment variables from an existing
// env file.
/**
 * Helper for resolving environment specific configuration files.
 *
 * It resolves .env files that are supported by the `dotenv` library.
 *
 * Please read the application configuration docs for more info.
 */

registerEnvFile();

// EXPORTED HELPERS

/**
 * Gets a string environment variable by the given name.
 *
 * @param  {String} name - The name of the environment variable.
 * @param  {String} defaultVal - The default value to use.
 *
 * @return {String} The value.
 */
function string(name, defaultVal) {
  return process.env[name] || defaultVal;
}

/**
 * Gets a number environment variable by the given name.
 *
 * @param  {String} name - The name of the environment variable.
 * @param  {number} defaultVal - The default value to use.
 *
 * @return {number} The value.
 */
function number(name, defaultVal) {
  return process.env[name] ? parseInt(process.env[name], 10) : defaultVal;
}

function bool(name, defaultVal) {
  return process.env[name] ? process.env[name] === 'true' || process.env[name] === '1' : defaultVal;
}