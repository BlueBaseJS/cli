const path = require('path');
const { spawn } = require('child_process');
const electronDir = path.resolve(__dirname, '../');
const crossEnv = 'node_modules/.bin/cross-env ';

const generateBootFile = require('../../scripts/generateBootFile');
const createPackageJson = require('./createPackageJson');

generateBootFile();
createPackageJson();

const remove = `rm -rf ${path.resolve(process.cwd(), 'electron/build')}`;
const buildMain = `${crossEnv}BABEL_ENV=electron-build node_modules/.bin/webpack --env.platform=electron --env.prod --config ${path.resolve(electronDir, 'webpack.config.js')}`;
const buildRenderer = `${crossEnv} BABEL_ENV=build node --max_old_space_size=4096 node_modules/webpack/bin/webpack.js --env.prod --config ${path.resolve(electronDir, 'webpack.config.js')}`;
const build = `${remove} & ${buildMain} & ${buildRenderer}`;
const runBuild = `${crossEnv} DEBUG_PROD=false ${build} && `;
const packageWin = `${runBuild}electron-packager . --overwrite --asar --platform=win32 --arch=x64 --electron-version=1.7.9 --dir=./electron --prune=true --out=electron/windows-build`;
spawn(packageWin, { shell: true, stdio: 'inherit' });
