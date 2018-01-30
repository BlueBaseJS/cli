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
const { smart } = require('webpack-merge');
const fs = require('fs');
const generateBootFile = require('../../../scripts/generateBootFile');
const createManifestJson = require('./createManifestJson');

generateBootFile('build.web');
createManifestJson();

// Removed appRootDir.get()
// AppRootDir basically give us root path if external project has package.json
// Then AppRootDir is equal to process.cwd()
// Else it will give us root path.
// First clear the build output dir.
exec(`rm -rf ${pathResolve(appRootDir.get(), config('buildOutputPath'))}`);


let webpackConfig = webpackConfigFactory({ target: 'client', optimize:true });
const webpackPath = path.resolve(process.cwd(), './web/webpack.config.js');
if (fs.existsSync(webpackPath)) {
	try {
		const addedConfig = require(webpackPath);
		if (typeof addedConfig === 'function') {
			webpackConfig = addedConfig(webpackConfig, 'production');
		} else {
			webpackConfig = smart( webpackConfig, addedConfig);
		}
	} catch (e) { console.error(e); }
}
const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {

	if (err) {
		console.error('werroe', err);
		return;
	}
	console.log('stats', stats.toString({ colors: true }));
});
