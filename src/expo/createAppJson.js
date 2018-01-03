const path = require('path');
const fs = require('fs');
const kebabCase = require('lodash.kebabcase');
const shell = require('shelljs');
const chalk = require('chalk');

/**
 * function to create/update expo app.json file according to the config in bluerain.js
 */
function createAppJson() {
	shell.echo(chalk.blue('Generating app.json'));
	const bluerainJs = require(path.resolve(process.cwd(), 'bluerain.js'));
	const packageJson = require(path.resolve(process.cwd(), 'package.json'));

	const appJson = {};
	const bluerainConfig = bluerainJs.config;

	appJson.name = bluerainConfig.title;
	appJson.slug = bluerainConfig.slug || kebabCase(appJson.name);
	appJson.sdkVersion = bluerainConfig.sdkVersion || packageJson.dependencies.expo || packageJson.devDependencies.expo;
	if (appJson.sdkVersion) {
		appJson.sdkVersion = appJson.sdkVersion.replace(/\^/, '');
		const arr = appJson.sdkVersion.split('.');
		arr[1] = '0';
		arr[2] = '0';
		appJson.sdkVersion = arr.join('.');
	}
	appJson.version = bluerainConfig.version || packageJson.version;
	appJson.description = bluerainConfig.description;
	appJson.loading = bluerainConfig.loading;
	if (bluerainConfig.theme && bluerainConfig.theme.colors) {
		appJson.primaryColor = bluerainConfig.theme.colors.primary;
	}
	if (bluerainConfig.orientation === 'any' || bluerainConfig.orientation === 'natural') {
		appJson.orientation = 'default';
	} else if (bluerainConfig.orientation && bluerainConfig.orientation.includes('landscape')) {
		appJson.orientation = 'landscape';
	} else if (bluerainConfig.orientation && bluerainConfig.orientation.includes('portrait')) {
		appJson.orientation = 'portrait';
	}
	if (bluerainConfig.icons) {
		for (const icon in bluerainConfig.icons) {
			if ('default' in  icon) {
				appJson.icon = icon.src;
			}
		}
	}
	appJson.privacy = bluerainConfig.privacy;
	appJson.notification = bluerainConfig.notification;
	appJson.appKey = bluerainConfig.appKey;
	appJson.androidStatusBar = bluerainConfig.androidStatusBar;
	appJson.androidShowExponentNotificationInShellApp = bluerainConfig.androidShowExponentNotificationInShellApp;
	appJson.scheme = bluerainConfig.scheme;
	appJson.entryPoint = bluerainConfig.entryPoint;
	appJson.extra = bluerainConfig.extra;
	appJson.rnCliPath = bluerainConfig.rnCliPath;
	appJson.packagerOpts = bluerainConfig.packagerOpts;
	appJson.ignoreNodeModulesValidation = bluerainConfig.ignoreNodeModulesValidation;
	appJson.nodeModulesPath = bluerainConfig.nodeModulesPath;
	appJson.splash = bluerainConfig.splash;
	appJson.facebookScheme = bluerainConfig.facebookScheme;
	appJson.ios = bluerainConfig.ios;
	appJson.android = bluerainConfig.android;

	fs.writeFileSync(path.join(__dirname, '../../', 'app.json'), JSON.stringify({ expo: appJson }));
}

module.exports = createAppJson;
