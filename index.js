#!/usr/bin/env node
// const { request } = require('http');

const inquirer = require('inquirer');
const path = require('path');
const shell = require('shelljs');
const colors = require('colors/safe');
const set = require('lodash.set');
const crossEnv = 'node_modules/.bin/cross-env ';
const exp = 'node_modules/.bin/exp ';
const webpackDevServer = 'node_modules/.bin/webpack-dev-server ';
// var exec = require('exec');
const { spawn } = require('child_process');
const fs = require('fs');
const createAppJson = require('./expo/createAppJson');
const createManifestJson = require('./web/createManifestJson');

const { checkPackageJson } = require('./src/tools/package');

checkPackageJson.then(result => console.log(`Project initialized: ${result}`));

// bluerain init command script
if (process.argv.includes('init')) {
	console.log('Initializing your project for bluerain...');
	if (!fs.existsSync(path.resolve(process.cwd(), 'package.json') ) ) {
		console.log(colors.bgRed.white('No package.json found. Please run "npm init" to create package.json'));
	} else {
		const packageJson = require(path.join(process.cwd(), 'package.json'));

		set(
			packageJson, 'devDependencies.bluerain-cli',
			'0.1.0'
		);

		packageJson.dependencies = Object.assign({}, packageJson.dependencies, {
			'@blueeast/bluerain-os':'^0.5.0',
		});
		fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2),  'utf-8');
		shell.cp('-R', path.join(__dirname, 'bluerain.js'), path.resolve(process.cwd()));
		console.log('Project initialized.Please run "npm install" to install dependencies');
	}
	process.exit();
}

// // Check if directory has been initialized or not
// if (!fs.existsSync(path.resolve(process.cwd(), 'bluerain.js') ) ) {
// 	console.log('Error: "bluerain.js" not found please run "bluerain init" to initialize directory to bluerain project.');
// 	process.exit();
// }

// inquirer.prompt([
// 	{
// 		type: 'list',
// 		name: 'platform',
// 		message: 'What platform do you want?',
// 		choices: [
// 			'web',
// 			'electron',
// 			'ios',
// 			'android'
// 		]
// 	}
// ]).then((answers) => {
// 	const platform = answers.platform;
// 	if (platform === 'electron') {
// 		const pkg = require(path.join(process.cwd(), './package.json'));
// 		pkg.main = 'build';
// 		const content = JSON.stringify(pkg, null, 2);
// 		shell.mkdir('-p', 'electron');
// 		fs.writeFile(path.join(process.cwd(), 'electron/package.json'), content, 'utf8', (err) => {
// 			if (err) {
// 				return console.log(err);
// 			}
// 		});
// 		inquirer.prompt([
// 			{
// 				type: 'list',
// 				name: 'command',
// 				message: 'What command do you want to run?',
// 				choices: [
// 					'start',
// 					'build',
// 					'linux-package',
// 					'windows-package',
// 					'mac-package'
// 				]
// 			}
// 		]).then((answers2) => {

// 			const electronDir = path.resolve(__dirname, 'electron');

// 			// build script for electron
// 			const remove = `rm -rf ${path.resolve(process.cwd(), 'electron/build')}`;
// 			const buildMain = `${crossEnv}BABEL_ENV=electron-build node_modules/.bin/webpack --env.platform=electron --env.prod --config ${path.resolve(electronDir, 'webpack.config.js')}`;
// 			const buildRenderer = `${crossEnv} BABEL_ENV=build node --max_old_space_size=4096 node_modules/webpack/bin/webpack.js --env.prod --config ${path.resolve(electronDir, 'webpack.config.js')}`;
// 			const build = `${remove} & ${buildMain} & ${buildRenderer}`;


// 			if ( answers2.command === 'start') {
// 				const startDev = `${crossEnv} BABEL_ENV=electron NODE_ENV=development electron -r babel-register ${path.resolve(electronDir, 'app/main')}`;
// 				const devServer = `${webpackDevServer} --config ${path.resolve(electronDir, 'webpack.config.js')}`;
// 				const execCommand = `${devServer} & ${startDev}`;
// 				shell.exec(execCommand);

// 			} else if ( answers2.command === 'build') {
// 				spawn(build, { shell: true, stdio: 'inherit' });
// 			} else if ( answers2.command === 'linux-package') {
// 				const pkg =  `rm -rf ${path.resolve(process.cwd(), 'electron/linux-build')} && ${crossEnv} DEBUG_PROD=false ${build} && node ${path.resolve(electronDir, 'tasks/package')}`;
// 				spawn(pkg, { shell: true, stdio: 'inherit' });
// 			} else if ( answers2.command === 'windows-package') {
// 				const runBuild = `${crossEnv} DEBUG_PROD=false ${build} && `;
// 				const packageWin = `${runBuild}electron-packager . --overwrite --asar --platform=win32 --arch=x64 --electron-version=1.7.9 --dir=./electron --prune=true --out=electron/windows-build`;
// 				spawn(packageWin, { shell: true, stdio: 'inherit' });
// 			} else if ( answers2.command === 'mac-package') {
// 				const runBuild = `${crossEnv} DEBUG_PROD=false ${build} && `;
// 				const packageMac = `${runBuild}electron-packager . --overwrite --platform=darwin --arch=x64 --electron-version=1.7.9 --dir=./electron --prune=true --out=electron/mac-build`;
// 				spawn(packageMac, { shell: true, stdio: 'inherit' });
// 			}
// 		});
// 	} else {
// 		inquirer.prompt([
// 			{
// 				type: 'list',
// 				name: 'command',
// 				message: 'What command do you want to run?',
// 				choices: [
// 					'start',
// 					'build',
// 				]
// 			}
// 		]).then((answers2) => {
// 			if (platform === 'web' && answers2.command === 'start') {
// 				createManifestJson();
// 				spawn(
// 					webpackDevServer,
// 					['--inline', '--hot',
// 						'--history-api-fallback',
// 						`--content-base ${path.resolve(__dirname, 'web')}`,
// 						` --config ${path.resolve(__dirname, 'web/webpack.config.js')}`],
// 					{ shell: true, stdio: 'inherit' }
// 				);
// 			} else if (platform === 'web' && answers2.command === 'build') {
// 				createManifestJson();
// 				const execCommand = `babel-node ${path.resolve(__dirname, 'web/internal/scripts/build')} --optimize`;
// 				spawn(execCommand, { shell: true, stdio: 'inherit' });
// 			} else if ((platform === 'android' || platform === 'ios') && answers2.command === 'start') {
// 				createAppJson();
// 				const execCommand = `${exp} start --lan --dev ${__dirname}`;
// 				spawn(execCommand, { shell: true, stdio: 'inherit' });
// 			} else if (platform === 'android' && answers2.command === 'build') {
// 				createAppJson();
// 				spawn('exp', ['build:android', __dirname], { shell: true, stdio: 'inherit' });
// 			} else if (platform === 'ios' && answers2.command === 'build') {
// 				createAppJson();
// 				spawn('exp', ['build:ios', __dirname], { shell: true, stdio: 'inherit' });
// 			}
// 			console.log('Your platform is: ', platform, 'Your command is: ', answers2.command);
// 		});
// 	}
// });
