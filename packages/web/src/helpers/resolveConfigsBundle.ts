import { Utils } from '@bluebase/cli-core';
import defaultClientConfigs from '../configFiles/client.config';
import defaultServerConfigs from '../configFiles/server.config';
import defaultClientWebpackConfigs from '../configFiles/webpack.config.client';
import defaultServerWebpackConfigs from '../configFiles/webpack.config.server';
import path from 'path';
import { findFile } from '.';
import { ClientConfigs, ServerConfigs } from '../types';
import { Configuration as WebpackConfiguration } from 'webpack';
import { PathsBundle } from './getPathsBundle';
// import { useOwn } from './useOwn';

export interface ConfigsBundleOptions {
  development: boolean, 
}

// Transpile files on the fly
require("@babel/register")({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: ['babel-preset-bluebase'],
});


export interface ConfigsBundle extends PathsBundle {
  clientConfigs: ClientConfigs,
  serverConfigs: ServerConfigs,
  clientWebpackConfigs: WebpackConfiguration,
  serverWebpackConfigs: WebpackConfiguration,
};

/**
 * Returns everything required by the run script.
 * 
 * i.e. resolves all paths and configs
 *
 * @param flags
 * @param options
 */

export function resolveConfigsBundle(flags: PathsBundle, options: Partial<ConfigsBundleOptions>): ConfigsBundle {

  const {
    development = true,
  } = options;

  /////////////////////////
  ///// Resolve Paths /////
  /////////////////////////

  // Absolute path of build dir
  const assetsDirPath = Utils.fromProjectRoot(flags.assetsDirPath);
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
  let clientConfigs = defaultClientConfigs({} as any, flags);

  // See if there is a custom webpack config file in the project
  const clientConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'config.client'),
    './emptyFn.js'
  );

  // Import the file
  let customClientConfigs = require(clientConfigPath);
  customClientConfigs = customClientConfigs.default || customClientConfigs;

  // Use these configs
  clientConfigs = customClientConfigs(clientConfigs, flags);

  ///////////////////////////////////
  ///// Generate Server Configs /////
  ///////////////////////////////////

  // Get default webpack configs
  let serverConfigs = defaultServerConfigs({} as any, flags);

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

  // //////////////////////////////////
  // ///// Client Webpack Configs /////
  // //////////////////////////////////

  const baseClientWebpackOptions = {
    appJsPath,
    assetsDirPath,
    bluebaseJsPath,
    buildDirPath: buildDir,
    configDirPath: configDir,
    static: flags.static,
    clientConfigPath: flags.clientConfigPath,
    serverConfigPath: flags.serverConfigPath,
    configs: {
      ...clientConfigs,
      mode: development ? 'development' : 'production' as any },
  };

  // Get default webpack configs
  let clientWebpackConfigs = defaultClientWebpackConfigs({}, baseClientWebpackOptions);

  // See if there is a custom webpack config file in the project
  const webpackClientConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'webpack.config.client'),
    './emptyFn.js'
  );

  // Import the file
  let customClientWebpackConfigs = require(webpackClientConfigPath);
  customClientWebpackConfigs = customClientWebpackConfigs.default || customClientWebpackConfigs;
  
  // Use these configs
  clientWebpackConfigs = customClientWebpackConfigs(clientWebpackConfigs, baseClientWebpackOptions);

  // //////////////////////////////////
  // ///// Server Webpack Configs /////
  // //////////////////////////////////

  const baseServerWebpackOptions = {
    appJsPath,
    assetsDirPath,
    bluebaseJsPath,
    buildDirPath: buildDir,
    configDirPath: configDir,
    static: flags.static,
    clientConfigPath: flags.clientConfigPath,
    serverConfigPath: flags.serverConfigPath,
    configs: {
      ...serverConfigs,
      mode: development ? 'development' : 'production' as any },
  };

  // Get default webpack configs
  let serverWebpackConfigs = defaultServerWebpackConfigs({}, baseServerWebpackOptions);

  // See if there is a custom webpack config file in the project
  const webpackServerConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'webpack.config.client'),
    './emptyFn.js'
  );

  // Import the file
  let customServerWebpackConfigs = require(webpackServerConfigPath);
  customServerWebpackConfigs = customServerWebpackConfigs.default || customServerWebpackConfigs;
  
  // Use these configs
  serverWebpackConfigs = customServerWebpackConfigs(serverWebpackConfigs, baseServerWebpackOptions);

  //////////////////
  ///// Return /////
  //////////////////

  return {
    ...flags,
    clientConfigs,
    serverConfigs,
    clientWebpackConfigs,
    serverWebpackConfigs,
  }
}