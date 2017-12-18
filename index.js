#!/usr/bin/env node
const inquirer = require('inquirer');
const path = require('path');
var shell = require('shelljs');
const colors = require('colors/safe');
const set = require('lodash.set');
const crossEnv = 'node_modules/.bin/cross-env ';
const exp = 'node_modules/.bin/exp ';
const webpackDevServer = 'node_modules/.bin/webpack-dev-server ';
// var exec = require('exec');
const { spawn, exec } = require('child_process')
const fs = require('fs');
const kebabCase = require('lodash.kebabcase');

// bluerain init command script
if(process.argv.includes('init')){
  console.log('Initializing your project for bluerain...');
  if (!fs.existsSync(path.resolve(process.cwd(), 'package.json') ) ) {
    console.log(colors.bgRed.white('No package.json found. Please run "npm init" to create package.json'))
  }else {
    let packageJson = require(path.join(process.cwd(), 'package.json'));

    set(packageJson,'devDependencies.bluerain-cli',
     "git+ssh://https://github.com/BlueEastCode/bluerain-cli.git#feature/boot-from-cli");
    
     packageJson.dependencies=Object.assign({},packageJson.dependencies, {
      '@blueeast/bluerain-os':'^0.5.0',
    });
    fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2),  'utf-8');
    shell.cp('-R', path.join(__dirname,'bluerain.js'), path.resolve(process.cwd()));
    console.log('Project initialized.Please run "npm install" to install dependencies');
  }
  process.exit()
}

//Check if directory has been initialized or not
if (!fs.existsSync(path.resolve(process.cwd(), 'bluerain.js') ) ) {
  console.log('Error: "bluerain.js" not found please run "bluerain init" to initialize directory to bluerain project.');
  process.exit();
}
//Function to update the import path of bluerain.js in boot.js file 
function editBootFile(){
  let data = fs.readFileSync(path.join(__dirname, 'bootTemplate.js'));
    data = data.toString();
    data = data.replace('CONFIG_PATH', path.resolve(process.cwd(), 'bluerain.js'));
    data = data.replace('OS_PATH', path.resolve(process.cwd(), 'node_modules/@blueeast/bluerain-os'));
    fs.writeFileSync(path.join(__dirname, 'boot.js'), data);
}

// function to create/update web-manifest file according to the config in bluerain.js
function createManifestJson(){
  let bootConfig = require(path.resolve(process.cwd(), 'bluerain.js'));
  bootConfig = bootConfig.config;
  const manifestJson = {};
  manifestJson.name = bootConfig.title;
  manifestJson.short_name = bootConfig.slug || kebabCase(manifestJson.name);;
  manifestJson.description = bootConfig.description;
  manifestJson.icons = bootConfig.icons;
  manifestJson.orientation = bootConfig.orientation;
  if (bootConfig.theme && bootConfig.theme.colors){
    manifestJson.theme_color = bootConfig.theme.colors.primary;
  }
  if (bootConfig.loading ){
    manifestJson.background_color = bootConfig.loading.backgroundColor;
  }
  manifestJson.dir = bootConfig.dir;
  manifestJson.display = bootConfig.display;
  manifestJson.lang = bootConfig.lang|| bootConfig.locale;
  manifestJson.prefer_related_applications = bootConfig.prefer_related_applications;
  manifestJson.related_applications = bootConfig.related_applications;
  manifestJson.scope = bootConfig.scope;
  manifestJson.start_url = bootConfig.start_url;
  fs.writeFileSync(path.join(__dirname, 'web/manifest.webmanifest'), JSON.stringify(manifestJson));
}

// function to create/update expo app.json file according to the config in bluerain.js
function createAppJson(){
  const appJson ={};
  let bootConfig = require(path.resolve(process.cwd(), 'bluerain.js'));
  const packageJson = require('./package.json');
  bootConfig = bootConfig.config;
  appJson.name = bootConfig.title;
  appJson.slug = bootConfig.slug || kebabCase(appJson.name);
  appJson.sdkVersion = bootConfig.sdkVersion || packageJson.dependencies.expo || packageJson.devDependencies.expo;
  if (appJson.sdkVersion){
    appJson.sdkVersion = appJson.sdkVersion.replace(/\^/,'');
    const arr = appJson.sdkVersion.split('.');
    arr[1] = arr[2] = '0';
    appJson.sdkVersion = arr.join('.');
  }
  appJson.version = bootConfig.version || packageJson.version;
  appJson.description = bootConfig.description;
  appJson.loading = bootConfig.loading;
  if (bootConfig.theme && bootConfig.theme.colors){
    appJson.primaryColor = bootConfig.theme.colors.primary;
  }
  if (bootConfig.orientation === 'any' || bootConfig.orientation === 'natural') {
    appJson.orientation = 'default'
  }else if (bootConfig.orientation && bootConfig.orientation.includes('landscape')){
    appJson.orientation = 'landscape'
  }else if (bootConfig.orientation && bootConfig.orientation.includes('portrait')){
    appJson.orientation = 'portrait'
  }
  if (bootConfig.icons){
    for (icon in icons) {
      if ('default' in  icon){
        appJson.icon = icon.src;
      }
    }
  }
  appJson.privacy = bootConfig.privacy;
  appJson.notification = bootConfig.notification;
  appJson.appKey = bootConfig.appKey;
  appJson.androidStatusBar = bootConfig.androidStatusBar;
  appJson.androidShowExponentNotificationInShellApp = bootConfig.androidShowExponentNotificationInShellApp;
  appJson.scheme = bootConfig.scheme;
  appJson.entryPoint = bootConfig.entryPoint;
  appJson.extra = bootConfig.extra;
  appJson.rnCliPath = bootConfig.rnCliPath;
  appJson.packagerOpts = bootConfig.packagerOpts;
  appJson.ignoreNodeModulesValidation = bootConfig.ignoreNodeModulesValidation;
  appJson.nodeModulesPath = bootConfig.nodeModulesPath;
  appJson.splash = bootConfig.splash;
  appJson.facebookScheme = bootConfig.facebookScheme;
  appJson.ios = bootConfig.ios;
  appJson.android = bootConfig.android;
  fs.writeFileSync(path.join(__dirname, 'app.json'), JSON.stringify({expo: appJson}));
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
      const package = require(path.join(process.cwd(),'./package.json'));
      package.main= 'build';
      const content = JSON.stringify(package, null, 2);
      shell.mkdir('-p', 'electron');
      fs.writeFile(path.join(process.cwd(),"electron/package.json"), content, 'utf8', function (err) {
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
          createManifestJson();
          const child = spawn(webpackDevServer, 
            ['--inline', '--hot',
             '--history-api-fallback',
             '--content-base '+ path.resolve(__dirname, 'web'),
             ' --config '+ path.resolve(__dirname, 'web/webpack.config.js')],
             { shell: true, stdio: 'inherit' });
        }
        else if (platform === 'web' && answers2.command === 'build') {
          createManifestJson();
          const execCommand = 'babel-node '+ path.resolve(__dirname,'web/internal/scripts/build')+' --optimize';
          spawn(execCommand, { shell: true, stdio: 'inherit' });
        }
        else if ((platform === 'android' || platform==='ios') && answers2.command === 'start') {
          createAppJson();
          const execCommand =exp+' start --lan --dev ' + __dirname;
          spawn(execCommand, { shell: true, stdio: 'inherit' });
        }else if (platform === 'android' && answers2.command === 'build') {
          createAppJson();
          const child = spawn('exp', ['build:android', __dirname], { shell: true, stdio: 'inherit' });
        }else if (platform === 'ios' && answers2.command === 'build') {
          createAppJson();
          const child = spawn('exp', ['build:ios', __dirname], { shell: true, stdio: 'inherit' });
        }
          console.log('Your platform is: ', platform, 'Your command is: ', answers2.command)
    }); 
  }
});  