"use strict";
/**
 * Helper for resolving environment specific configuration files.
 *
 * It resolves .env files that are supported by the `dotenv` library.
 *
 * Please read the application configuration docs for more info.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const paths_1 = require("../paths");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const ifElse_1 = __importDefault(require("../logic/ifElse"));
const removeNil_1 = __importDefault(require("../arrays/removeNil"));
// PRIVATES
function registerEnvFile() {
    const DEPLOYMENT = process.env.DEPLOYMENT;
    const envFile = '.env';
    // This is the order in which we will try to resolve an environment configuration
    // file.
    const envFileResolutionOrder = removeNil_1.default([
        // Is there an environment config file at the app root?
        // This always takes preference.
        // e.g. /.env
        paths_1.fromProjectRoot(envFile),
        // Is there an environment config file at the app root for our target
        // environment name?
        // e.g. /projects/react-universally/.env.staging
        ifElse_1.default(DEPLOYMENT)(paths_1.fromProjectRoot(`${envFile}.${DEPLOYMENT}`)),
    ]);
    // Find the first env file path match.
    const envFilePath = envFileResolutionOrder.find(filePath => fs_1.default.existsSync(filePath));
    // If we found an env file match the register it.
    if (envFilePath) {
        __1.Utils.logger.info(`Registering environment variables from: ${envFilePath}`);
        dotenv_1.default.config({ path: envFilePath });
    }
}
// Ensure that we first register any environment variables from an existing
// env file.
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
exports.string = string;
/**
 * Gets a number environment variable by the given name.
 *
 * @param  {String} name - The name of the environment variable.
 * @param  {number} defaultVal - The default value to use.
 *
 * @return {number} The value.
 */
function number(name, defaultVal) {
    const num = process.env[name];
    return num ? parseInt(num, 10) : defaultVal;
}
exports.number = number;
function bool(name, defaultVal) {
    return process.env[name] ? process.env[name] === 'true' || process.env[name] === '1' : defaultVal;
}
exports.bool = bool;
//# sourceMappingURL=envVars.js.map