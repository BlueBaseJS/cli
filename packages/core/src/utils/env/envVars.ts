/**
 * Helper for resolving environment specific configuration files.
 *
 * It resolves .env files that are supported by the `dotenv` library.
 *
 * Please read the application configuration docs for more info.
 */

import dotenv from 'dotenv';
import fs from 'fs';

import ifElse from '../logic/ifElse';
import removeNil from '../arrays/removeNil';
import { fromProjectRoot } from '../paths';
import { Utils } from '@blueeast/bluerain-cli-core';

// PRIVATES

function registerEnvFile() {
  const DEPLOYMENT = process.env.DEPLOYMENT;
  const envFile = '.env';

  // This is the order in which we will try to resolve an environment configuration
  // file.
  const envFileResolutionOrder = removeNil([
    // Is there an environment config file at the app root?
    // This always takes preference.
    // e.g. /.env
		fromProjectRoot(envFile),
    // Is there an environment config file at the app root for our target
    // environment name?
    // e.g. /projects/react-universally/.env.staging
		ifElse(DEPLOYMENT)(fromProjectRoot(`${envFile}.${DEPLOYMENT}`)),
  ]);

  // Find the first env file path match.
  const envFilePath = envFileResolutionOrder.find(filePath => fs.existsSync(filePath));

  // If we found an env file match the register it.
  if (envFilePath) {
		Utils.logger.info(`Registering environment variables from: ${envFilePath}`);
    dotenv.config({ path: envFilePath });
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
export function string(name: string, defaultVal: string): string {
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
export function number(name: string, defaultVal: number): number {
	const num = process.env[name];
  return num ? parseInt(num, 10) : defaultVal;
}

export function bool(name: string, defaultVal: boolean): boolean {
  return process.env[name] ? process.env[name] === 'true' || process.env[name] === '1' : defaultVal;
}
