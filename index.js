#!/usr/bin/env node
const inquirer = require('inquirer');
const path = require('path');
var shell = require('shelljs');
const crossEnv = 'node_modules/.bin/cross-env ';
const exp = 'node_modules/.bin/exp ';
const webpackDevServer = 'node_modules/.bin/webpack-dev-server ';
var exec = require('exec');
const { spawn } = require('child_process')
const fs = require('fs');

function editBootFile(){
  let data = fs.readFileSync(path.join(__dirname, 'bootTemplate.js'));
    data = data.toString();
    data = data.replace('CONFIG_PATH', path.resolve(process.cwd(), 'bluerain.js'));
    fs.writeFileSync(path.join(__dirname, 'boot.js'), data);
}
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
    editBootFile();
    const platform = answers.platform;
    if(platform === 'electron') {
      const package = require('./package.json');
      package.main= 'build';
      const content = JSON.stringify(package);
      fs.writeFile("electron/package.json", content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
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
        const remove = 'rm -rf ' + path.resolve(process.cwd(), 'electron/build') ;
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
            spawn(build, { shell: true, stdio: 'inherit' });
          }
          else if ( answers2.command === 'linux-package') {
            // editBootFile();
            const package=  'rm -rf '+ path.resolve(process.cwd(), 'electron/linux-build')+ ' && '+ crossEnv + ' DEBUG_PROD=false ' + build + ' && node '+ path.resolve(electronDir, 'tasks/package');
            spawn(package, { shell: true, stdio: 'inherit' });
          }
          else if ( answers2.command === 'windows-package') {
            const runBuild = crossEnv + ' DEBUG_PROD=false ' + build + ' && ';
            const packageWin= runBuild + 'electron-packager . --overwrite --asar --platform=win32 --arch=x64 --electron-version=1.7.9 --dir=./electron --prune=true --out=electron/windows-build';
            spawn(packageWin, { shell: true, stdio: 'inherit' });
          }
          else if ( answers2.command === 'mac-package') {
            const runBuild = crossEnv + ' DEBUG_PROD=false ' + build + ' && ';
            const packageMac = runBuild + 'electron-packager . --overwrite --platform=darwin --arch=x64 --electron-version=1.7.9 --dir=./electron --prune=true --out=electron/mac-build';
            spawn(packageMac, { shell: true, stdio: 'inherit' });
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
          // editBootFile();
          const child = spawn(webpackDevServer, 
            ['--inline', '--hot',
             '--history-api-fallback',
             '--content-base '+ path.resolve(__dirname, 'web'),
             ' --config '+ path.resolve(__dirname, 'web/webpack.config.js')],
             { shell: true, stdio: 'inherit' });
        // const execCommand = 'node_modules/.bin/webpack-dev-server --inline --hot --history-api-fallback --content-base ' + path.resolve(__dirname, 'web')+' --config '+ path.resolve(__dirname, 'web/webpack.config.js');
        // shell.exec(execCommand);
        }
        else if (platform === 'web' && answers2.command === 'build') {
          // editBootFile();
          const execCommand = 'babel-node '+ path.resolve(__dirname,'web/internal/scripts/build')+' --optimize';
          spawn(execCommand, { shell: true, stdio: 'inherit' });
        }
        else if ((platform === 'android' || platform==='ios') && answers2.command === 'start') {
          const execCommand =exp+' start --lan --dev ' + __dirname;
          console.log(execCommand);
          spawn(execCommand, { shell: true, stdio: 'inherit' });
        }else if (platform === 'android' && answers2.command === 'build') {
          // const execCommand =  exp+' build:android ';
          // shell.exec(execCommand);
          const child = spawn('exp', ['build:android'], { shell: true, stdio: 'inherit' });
          // child.stdout.pipe(process.stdout);
          // pipe the main process input to the child process
          process.stdin.pipe(child.stdin);
        }else if (platform === 'ios' && answers2.command === 'build') {
          const child = spawn('exp', ['build:ios']);
          // pipe the main process input to the child process
          process.stdin.pipe(child.stdin);
        }

          console.log('Your platform is: ', platform, 'Your command is: ', answers2.command)
    }); 
  }
});  