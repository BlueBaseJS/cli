const path = require('path');
const shell = require('shelljs');
const electronDir = path.resolve(__dirname, '../');
const crossEnv = 'node_modules/.bin/cross-env ';

const generateBootFile = require('../../scripts/generateBootFile');
const createPackageJson = require('./createPackageJson');

generateBootFile();
createPackageJson();

const webpackDevServer = 'node_modules/.bin/webpack-dev-server ';
const startDev = `${crossEnv} BABEL_ENV=electron NODE_ENV=development electron -r babel-register ${path.resolve(electronDir, 'app/main')}`;
const devServer = `${webpackDevServer} --config ${path.resolve(electronDir, 'webpack.config.js')}`;
const execCommand = `${devServer} & ${startDev}`;
shell.exec(execCommand);
