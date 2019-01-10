import { Utils } from '@bluebase/cli-core';
import { Flags } from '../cli-flags';
import defaultClientConfigs from '../configFiles/client.config';
import defaultClientWebpackConfigs from '../configFiles/webpack.config.client';
import path from 'path';
import { findFile } from '.';

export interface ConfigsBundleOptions {
  development: boolean, 
}

// Transpile files on the fly
require("@babel/register")({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: ['babel-preset-bluebase'],
});

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
    Utils.fromCore('templates/common/bluebase.ts')
  );

  ////////////////////////////
  ///// Generate Configs /////
  ////////////////////////////

  // Get default webpack configs
  let clientConfigs = defaultClientConfigs({} as any, { buildDir, configDir });

  // See if there is a custom webpack config file in the project
  const clientConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'config.client'),
    Utils.fromCore('templates/common/config.client.ts')
  );

  // Import the file
  let customClientConfigs = require(clientConfigPath);
  customClientConfigs = customClientConfigs.default || customClientConfigs;

  // Use these configs
  clientConfigs = customClientConfigs(clientConfigs, { buildDir, configDir });

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
  const webpackClientConfigPath = findFile(
    Utils.fromProjectRoot(flags.configDir, 'webpack.config.client'),
    Utils.fromCore('templates/common/webpack.config.client.ts')
  );

  // Import the file
  let customClientWebpackConfigs = require(webpackClientConfigPath);
  customClientWebpackConfigs = customClientWebpackConfigs.default || customClientWebpackConfigs;

  // Use these configs
  clientWebpackConfigs = customClientWebpackConfigs(clientWebpackConfigs, baseWebpackBuildOptions);
  
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