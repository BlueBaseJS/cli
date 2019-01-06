import { Utils } from '@bluebase/cli-core';
import { Flags } from '../cli-flags';
import defaultClientConfigs from '../configFiles/client.config';
import defaultClientWebpackConfigs from '../configFiles/webpack.config.client';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';
import { findFile, webpackCompileDev } from '../scripts';
import { webpackCompile } from './webpackCompile';

export interface RunOptions {
  development: boolean, 
  label: string,
}

export function run(flags: Flags, options: Partial<RunOptions>) {

  const {
    development = true,
    label = '@bluebase/cli/web',
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

  ///////////////////////////
  ///// Clear build dir /////
  ///////////////////////////

  // Delete dir if already exists
  if (fs.existsSync(buildDir)) {
    rimraf.sync(buildDir);
  }

  // Create a new build dir
  shell.mkdir('-p', buildDir);

  /////////////////
  ///// Build /////
  /////////////////

  Utils.logger.log({
    label,
    level: 'info',
    message: `👨‍💻 Compiling BlueBase's client bundle`
  });

  if (development === true) {
    webpackCompileDev(clientWebpackConfigs, label);
  } else {
    webpackCompile(clientWebpackConfigs);
  }
}