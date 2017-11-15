/**
 * This script builds a production output of all of our bundles.
 */

import webpack from 'webpack';
import appRootDir from 'app-root-dir';
import { resolve as pathResolve } from 'path';
import webpackConfigFactory from '../webpack/configFactory';
import { exec } from '../utils';
import config from '../../config';
const path = require('path');
const {smart} = require('webpack-merge');
const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const [x, y, ...args] = process.argv;

const optimize = args.findIndex(arg => arg === '--optimize') !== -1;

// First clear the build output dir.
exec(`rm -rf ${pathResolve(appRootDir.get(), config('buildOutputPath'))}`);

// Get our "fixed" bundle names
// console.log('bundles: ', config('bundles'));
Object.keys(config('bundles'))
  // And the "additional" bundle names
  .concat(Object.keys(config('additionalNodeBundles')))
  // And then build them all.
  .forEach((bundleName) => {
    // console.log('bundle name: ', bundleName);

    let webpackConfig = webpackConfigFactory({ target: bundleName, optimize });
    const webpackPath = path.resolve(process.cwd(),'./web/webpack.config.js')
    if (fs.existsSync(webpackPath)) {
      try{
        const addedConfig = require(webpackPath);
        if (typeof addedConfig === "function"){
          webpackConfig = addedConfig(webpackConfig, 'production');
        }else {
          webpackConfig = smart( webpackConfig, addedConfig);
        }
      }
      catch(e){console.error(e)};
    }
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {

    require('../../registerServiceWorker');
      if (err) {
        console.error('werroe', err);
        return;
      }
      console.log('stats', stats.toString({ colors: true }));
    });
  });
