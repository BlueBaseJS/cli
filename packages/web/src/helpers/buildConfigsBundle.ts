import { Utils } from '@bluebase/cli-core';
import { Flags } from '../cli-flags';
import defaultClientConfigs from '../configFiles/client.config';
import defaultServerConfigs from '../configFiles/server.config';
import defaultClientWebpackConfigs from '../configFiles/webpack.config.client';
import path from 'path';
import { findFile } from '.';
import { ClientConfigs, ServerConfigs } from '../types';
import { Configuration as WebpackConfiguration } from 'webpack';

export interface ConfigsBundleOptions {
  development: boolean, 
}

// Transpile files on the fly
require("@babel/register")({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: ['babel-preset-bluebase'],
});


export interface ConfigsBundle {
  assetsDirPath: string,
  buildDir: string,
  configDir: string,
  appJsPath: string,
  bluebaseJsPath: string,
  clientConfigs: ClientConfigs,
  serverConfigs: ServerConfigs,
  clientWebpackConfigs: WebpackConfiguration,
};

/**
 * Returns everything required by the run script.
 * 
 * i.e. resolves all paths and configs
 *
 * @param flags
 * @param options
 */

export function buildConfigsBundle(flags: Flags, options: Partial<ConfigsBundleOptions>): ConfigsBundle {

  const {
    development = true,
  } = options;

  /////////////////////////
  ///// Resolve Paths /////
  /////////////////////////

  // Absolute path of build dir
  const assetsDirPath = Utils.fromProjectRoot(flags.assetsDir);
  const buildDir = Utils.fromProjectRoot(flags.buildDir);
  const configDir = Utils.fromProjectRoot(flags.configDir);
  
  // App.js
  const appJsPath = findFile(
    Utils.fromProjectRoot(flags.appJsPath),
    path.resolve(__dirname, '../client/App.js')
  );

  // bluebase.js
  const bluebaseJsPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'bluebase'),
    Utils.fromCore('templates/common/bluebase.ts')
  );

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
  let serverConfigs = defaultServerConfigs({} as any, { buildDir, configDir });

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

  // ///////////////////////////
  // ///// Webpack Configs /////
  // ///////////////////////////

  const baseWebpackBuildOptions = {
    appJsPath,
    assetsDirPath,
    bluebaseJsPath,
    buildDirPath: buildDir,
    configDirPath: configDir,
    static: flags.static,
    configs: {
      ...clientConfigs,
      mode: development ? 'development' : 'production' as any },
  };

  // Get default webpack configs
  let clientWebpackConfigs = defaultClientWebpackConfigs({}, baseWebpackBuildOptions);

  // See if there is a custom webpack config file in the project
  const webpackClientConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'webpack.config.client'),
    './emptyFn.js'
  );

  // Import the file
  let customClientWebpackConfigs = require(webpackClientConfigPath);
  customClientWebpackConfigs = customClientWebpackConfigs.default || customClientWebpackConfigs;
  
  // Use these configs
  clientWebpackConfigs = customClientWebpackConfigs(clientWebpackConfigs, baseWebpackBuildOptions);

  //////////////////
  ///// Return /////
  //////////////////

  return {
    assetsDirPath,
    buildDir,
    configDir,
    appJsPath,
    bluebaseJsPath,
    clientConfigs,
    serverConfigs,
    clientWebpackConfigs,
  }
}