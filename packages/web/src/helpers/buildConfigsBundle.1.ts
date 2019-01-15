import { Utils } from '@bluebase/cli-core';
import { Flags } from '../types';
import defaultClientConfigs from '../configFiles/client.config';
import defaultServerConfigs from '../configFiles/server.config';
import path from 'path';
import { findFile } from '.';
import { ClientConfigs, ServerConfigs } from '../types';
// import { useOwn } from './useOwn';

export interface ConfigsBundleOptions1 {
  development: boolean, 
}

// Transpile files on the fly
require("@babel/register")({
  // ignore: [],
  // compact: false,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: ['babel-preset-bluebase'],
  // plugins: [
  //   useOwn('@babel/plugin-transform-runtime'),
  //   useOwn('babel-plugin-react-native-web'),
  //   // [useOwn('babel-plugin-module-resolver'), {
  //   //   // "root": ["./src"],
  //   //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //   //   "alias": {
  //   //     "react-native": () => {
  //   //       Utils.logger.info('what>>');
  //   //       return 'react-native-web';
  //   //     }
  //   //   }
  //   // }]
  // ]
});


export interface ConfigsBundle1 {
  assetsDirPath: string,
  buildDir: string,
  configDir: string,
  appJsPath: string,
  // appJs: any,
  bluebaseJsPath: string,
  clientConfigs: ClientConfigs,
  serverConfigs: ServerConfigs,
};

/**
 * Returns everything required by the run script.
 * 
 * i.e. resolves all paths and configs
 *
 * @param flags
 * @param options
 */

export function buildConfigsBundle1(flags: Flags, _options: Partial<ConfigsBundleOptions1>): ConfigsBundle1 {

  /////////////////////////
  ///// Resolve Paths /////
  /////////////////////////

  // Absolute path of build dir
  const assetsDirPath = Utils.fromProjectRoot(flags.assetsDir);
  const buildDir = Utils.fromProjectRoot(flags.buildDir);
  const configDir = Utils.fromProjectRoot(flags.configDir);
  

  // bluebase.js
  const bluebaseJsPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'bluebase'),
    Utils.fromCore('templates/common/bluebase.ts')
  );

  //////////////////
  ///// App.js /////
  //////////////////

  // App.js
  const appJsPath = findFile(
    Utils.fromProjectRoot(flags.appJsPath),
    path.resolve(__dirname, '../client/App.js')
  );

  // let appJs = require(appJsPath);
  // appJs = appJs.default || appJs;

  ///////////////////////////////////
  ///// Generate Client Configs /////
  ///////////////////////////////////

  // Get default webpack configs
  let clientConfigs = defaultClientConfigs({} as any, { buildDir, configDir });

  // See if there is a custom webpack config file in the project
  const clientConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'config.client'),
    './emptyFn.js'
  );

  // Import the file
  let customClientConfigs = require(clientConfigPath);
  customClientConfigs = customClientConfigs.default || customClientConfigs;

  // Use these configs
  clientConfigs = customClientConfigs(clientConfigs, { buildDir, configDir });

  ///////////////////////////////////
  ///// Generate Server Configs /////
  ///////////////////////////////////

  // Get default webpack configs
  let serverConfigs = defaultServerConfigs({} as any, flags as any);

  // See if there is a custom webpack config file in the project
  const serverConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'config.server'),
    './emptyFn.js'
  );

  // Import the file
  let customServerConfigs = require(serverConfigPath);
  customServerConfigs = customServerConfigs.default || customServerConfigs;

  // Use these configs
  serverConfigs = customServerConfigs(serverConfigs, { buildDir, configDir });

  //////////////////
  ///// Return /////
  //////////////////

  return {
    // appJs,
    assetsDirPath,
    buildDir,
    configDir,
    appJsPath,
    bluebaseJsPath,
    clientConfigs,
    serverConfigs,
  }
}