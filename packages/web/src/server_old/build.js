import path from 'path';
import { buildStatic } from './core';
import packageJson from '../../package.json';
import getBaseConfig from './config/webpack.config.prod';
import loadConfig from './config';

buildStatic({
  packageJson,
  getBaseConfig,
  loadConfig,
  defaultFavIcon: path.resolve(__dirname, 'public/favicon.ico'),
});
