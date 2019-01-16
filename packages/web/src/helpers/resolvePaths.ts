import { fromCore, fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';
import { Flags, PathsBundle } from '../types';
import path from 'path';
import { findFile } from './findFile';

/**
 * Returns paths to all relevant files.
 * 
 * i.e. resolves all paths and configs
 *
 * @param flags
 */

export function resolvePaths(flags: Flags): PathsBundle {

  /////////////////////////
  ///// Resolve Paths /////
  /////////////////////////

  // Absolute path of build dir
  const assetsDir = fromProjectRoot(flags.assetsDir);
  const buildDir = fromProjectRoot(flags.buildDir);
  const configDir = fromProjectRoot(flags.configDir);
  

  // bluebase.js
  const bluebaseJsPath = findFile(
    path.resolve(flags.configDir, 'bluebase'),
    fromCore('templates/common/bluebase.ts')
  );

  //////////////////
  ///// App.js /////
  //////////////////

  // App.js
  const appJsPath = findFile(
    path.resolve(flags.configDir, 'App'),
    path.resolve(__dirname, '../client/App.js')
  );

  ///////////////////////////////////
  ///// Generate Client Configs /////
  ///////////////////////////////////

  // See if there is a custom config file in the project
  const clientConfigPath = findFile(
    path.resolve(flags.configDir, 'config.client'),
    path.resolve(__dirname, './emptyFn.js')
  );
    
  // See if there is a custom webpack config file in the project
  const clientWebpackConfigPath = findFile(
    path.resolve(flags.configDir, 'webpack.config.client'),
    path.resolve(__dirname, './emptyFn.js')
  );

  ///////////////////////////////////
  ///// Generate Server Configs /////
  ///////////////////////////////////

  // See if there is a custom config file in the project
  const serverConfigPath = findFile(
    path.resolve(flags.configDir, 'config.server'),
    path.resolve(__dirname, './emptyFn.js')
  );
    
  // See if there is a custom webpack config file in the project
  const serverWebpackConfigPath = findFile(
    path.resolve(flags.configDir, 'webpack.config.server'),
    path.resolve(__dirname, './emptyFn.js')
  );

  //////////////////
  ///// Return /////
  //////////////////

  return {
    appJsPath,
    assetsDir,
    bluebaseJsPath,
    buildDir,
    configDir,
    clientConfigPath,
    clientWebpackConfigPath,
    serverConfigPath,
    serverWebpackConfigPath,
    static: flags.static
  }
}