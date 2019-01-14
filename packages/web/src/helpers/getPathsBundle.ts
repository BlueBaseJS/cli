import { fromCore, fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';
import { Flags } from '../types';
// import defaultClientConfigs from '../configFiles/client.config';
// import defaultServerConfigs from '../configFiles/server.config';
import path from 'path';
import { findFile } from './findFile';
// import { ServerConfigs } from '../types';
// import { useOwn } from './useOwn';

export interface PathsBundleOptions {
  development: boolean, 
}

export interface PathsBundle {
  assetsDirPath: string,
  buildDir: string,
  configDir: string,
  appJsPath: string,
  bluebaseJsPath: string,
  clientConfigPath: string,
  serverConfigPath: string,
  static: boolean,
};

/**
 * Returns paths to all relevant files.
 * 
 * i.e. resolves all paths and configs
 *
 * @param flags
 * @param options
 */

export function getPathsBundle(flags: Flags): PathsBundle {

  /////////////////////////
  ///// Resolve Paths /////
  /////////////////////////

  // Absolute path of build dir
  const assetsDirPath = fromProjectRoot(flags.assetsDir);
  const buildDir = fromProjectRoot(flags.buildDir);
  const configDir = fromProjectRoot(flags.configDir);
  

  // bluebase.js
  const bluebaseJsPath = findFile(
    fromProjectRoot(flags.configDir, 'bluebase'),
    fromCore('templates/common/bluebase.ts')
  );

  //////////////////
  ///// App.js /////
  //////////////////

  // App.js
  const appJsPath = findFile(
    fromProjectRoot(flags.appJsPath),
    path.resolve(__dirname, '../client/App.js')
  );

  // let appJs = require(appJsPath);
  // appJs = appJs.default || appJs;

  ///////////////////////////////////
  ///// Generate Client Configs /////
  ///////////////////////////////////

  // // Get default webpack configs
  // let clientConfigs = defaultClientConfigs({} as any, { buildDir, configDir });

  // See if there is a custom webpack config file in the project
  const clientConfigPath = findFile(
    fromProjectRoot(flags.configDir, 'config.client'),
    './emptyFn.js'
  );

  // // Import the file
  // let customClientConfigs = require(clientConfigPath);
  // customClientConfigs = customClientConfigs.default || customClientConfigs;

  // // Use these configs
  // clientConfigs = customClientConfigs(clientConfigs, { buildDir, configDir });

  ///////////////////////////////////
  ///// Generate Server Configs /////
  ///////////////////////////////////

  // // Get default webpack configs
  // let serverConfigs = defaultServerConfigs({} as any, { buildDir, configDir });

  // See if there is a custom webpack config file in the project
  const serverConfigPath = findFile(
    fromProjectRoot(flags.configDir, 'config.server'),
    path.resolve(__dirname, './emptyFn.js')
  );

  // // Import the file
  // let customServerConfigs = require(serverConfigPath);
  // customServerConfigs = customServerConfigs.default || customServerConfigs;

  // // Use these configs
  // serverConfigs = customServerConfigs(serverConfigs, { buildDir, configDir });

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
    clientConfigPath,
    serverConfigPath,
    static: flags.static
  }
}