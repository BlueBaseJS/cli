import { Utils } from '@bluebase/cli-core';
import { Flags } from '../cli-flags';
import defaultClientConfigs from '../configFiles/client.config';
import defaultClientWebpackConfigs from '../configFiles/webpack.config.client';
import fs from 'fs';
import path from 'path';
import { findFile } from '.';

export interface ConfigsBundleOptions {
  development: boolean, 
}

/**
 * Returns everything required by the run script.
 * 
 * i.e. resolves all paths and configs
 *
 * @param flags
 * @param options
 */

export function buildConfigsBundle(flags: Flags, options: Partial<ConfigsBundleOptions>) {

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
    Utils.fromCore('templates/common/bluebase.js')
  );

  ////////////////////////////
  ///// Generate Configs /////
  ////////////////////////////

  // Get default webpack configs
  let clientConfigs = defaultClientConfigs({} as any, { buildDir, configDir });

  // See if there is a custom webpack config file in the project
  const clientConfigPath = Utils.fromProjectRoot(flags.configDir, 'config.client.js');

  // If there is infact a file, then use it
  if (fs.existsSync(clientConfigPath)) {

    // Import the file
    let customClientWebpackConfigs = require(clientConfigPath);

    // Use these configs
    clientConfigs = customClientWebpackConfigs(clientConfigs, { buildDir, configDir });
  }

  // ///////////////////////////
  // ///// Webpack Configs /////
  // ///////////////////////////

  const baseWebpackBuildOptions = {
    appJsPath,
    assetsDirPath,
    bluebaseJsPath,
    buildDirPath: buildDir,
    configDirPath: configDir,
    configs: {
      ...clientConfigs,
      mode: development ? 'development' : 'production' as any },
  };

  // Get default webpack configs
  let clientWebpackConfigs = defaultClientWebpackConfigs({}, baseWebpackBuildOptions);

  // See if there is a custom webpack config file in the project
  const webpackClientConfigPath = Utils.fromProjectRoot(flags.configDir, 'webpack.config.client.js');

  // If there is infact a file, then use it
  if (fs.existsSync(webpackClientConfigPath)) {

    // Import the file
    let customClientWebpackConfigs = require(webpackClientConfigPath);

    // Use these configs
    clientWebpackConfigs = customClientWebpackConfigs(clientWebpackConfigs, baseWebpackBuildOptions);
  }
  
  // const mainCompiler = webpack(mainWebpackConfigs);

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
    clientWebpackConfigs,
  }
}