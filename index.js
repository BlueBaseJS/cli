#!/usr/bin/env node
const inquirer = require('inquirer');
const path = require('path');
var shell = require('shelljs');
const crossEnv = 'node_modules/.bin/cross-env ';
const exp = 'node_modules/.bin/exp ';
const webpackDevServer = 'node_modules/.bin/webpack-dev-server ';
var exec = require('exec');
inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'What platform do you want?',
      choices: [
        'web',
        'electron',
        'ios',
        'android'
      ]
    }
  ]).then(function (answers) {
    const platform = answers.platform;
    if(platform === 'electron') {
      inquirer.prompt([
        {
          type: 'list',
          name: 'command',
          message: 'What command do you want to run?',
          choices: [
            'start',
            'build',
            'linux-package',
            'windows-package',
            'mac-package'
          ]
        }
      ]).then(function (answers2) {

        const electronDir = path.resolve(__dirname, 'electron');

        // build script for electron
        const remove = 'rm -rf ' + path.resolve(process.cwd(), 'electron/build') + ' yes | cp -rf package.json electron/';
        const buildMain= crossEnv + 'BABEL_ENV=electron-build node_modules/.bin/webpack --env.platform=electron --env.prod --config '+ path.resolve(electronDir, 'webpack.config.js');
        const buildRenderer = crossEnv + ' BABEL_ENV=build node --max_old_space_size=4096 node_modules/webpack/bin/webpack.js --env.prod --config '+ path.resolve(electronDir, 'webpack.config.js');
        const build = remove +' & '+ buildMain +' & '+ buildRenderer;


        if ( answers2.command === 'start') {
          const startDev= crossEnv + ' BABEL_ENV=electron NODE_ENV=development electron -r babel-register '+ path.resolve(electronDir, 'app/main');
          const devServer= webpackDevServer+ ' --config '+ path.resolve(electronDir, 'webpack.config.js');
          const execCommand = devServer+ ' & ' +  startDev;
          shell.exec(execCommand);
          }
          else if ( answers2.command === 'build') {
            shell.exec(build);
          }
          else if ( answers2.command === 'linux-package') {
            const package=  'rm -rf '+ path.resolve(process.cwd(), 'electron/linux-build')+ ' && '+ crossEnv + ' DEBUG_PROD=false ' + build + ' && node '+ path.resolve(electronDir, 'tasks/package');
            shell.exec(package);
          }
          else if ( answers2.command === 'windows-package') {
            const runBuild = crossEnv + ' DEBUG_PROD=false ' + build + ' && ';
            const packageWin= runBuild + 'electron-packager . --overwrite --asar --platform=win32 --arch=x64 --electron-version=1.7.9 --dir=./electron --prune=true --out=electron/windows-build';
            shell.exec(packageWin);
          }
          else if ( answers2.command === 'mac-package') {
            const runBuild = crossEnv + ' DEBUG_PROD=false ' + build + ' && ';
            const packageMac = runBuild + 'electron-packager . --overwrite --platform=darwin --arch=x64 --electron-version=1.7.9 --dir=./electron --prune=true --out=electron/mac-build';
            shell.exec(packageMac);
          }
      })
    } else {
    inquirer.prompt([
        {
          type: 'list',
          name: 'command',
          message: 'What command do you want to run?',
          choices: [
            'start',
            'build',
          ]
        }
      ]).then(function (answers2) {
        if (platform === 'web' && answers2.command === 'start') {
        const execCommand = 'node_modules/.bin/webpack-dev-server --inline --hot --history-api-fallback --content-base ' + path.resolve(__dirname, 'web')+' --config '+ path.resolve(__dirname, 'web/webpack.config.js');
        shell.exec(execCommand);
        }
        else if (platform === 'web' && answers2.command === 'build') {
          const execCommand = 'babel-node '+ path.resolve(__dirname,'web/internal/scripts/build')+' --optimize';
          shell.exec(execCommand);
        }
        else if ((platform === 'android' || platform==='ios') && answers2.command === 'start') {
          const execCommand =' yes | cp -rf package.json native/ && '+ exp+' start ';
          console.log(execCommand);
          shell.exec(execCommand);
        }else if (platform === 'android' && answers2.command === 'build') {
          const execCommand =  exp+' build:android ';
          shell.exec(execCommand);
        }else if (platform === 'ios' && answers2.command === 'build') {
          const execCommand = exp+' build:ios ';
          shell.exec(execCommand);
        }

          console.log('Your platform is: ', platform, 'Your command is: ', answers2.command)
    }); 
  }
});  