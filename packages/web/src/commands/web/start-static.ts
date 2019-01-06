import { FileManager, Utils } from '@bluebase/cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import fs from 'fs';
import getConfigFiles from '../../configFiles';
import path from 'path';
import rimraf from 'rimraf';
import serve from 'webpack-serve';
import shell from 'shelljs';

const webpackServeWaitpage = require('webpack-serve-waitpage');

export class CustomCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluebase/cli/web-static',
			level: 'info',
			message: '🌏 Starting BlueBase Development Server...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);
		let appJsPath = Utils.fromProjectRoot(flags.appJsPath);
		// const customWebPackClientConfigPath = Utils.fromProjectRoot(flags.webpackClientConfigPath);
		// const customWebPackServerConfigPath = Utils.fromProjectRoot(flags.webpackServerConfigPath);

		if (!fs.existsSync(appJsPath)) {
			appJsPath = path.resolve(__dirname, '../../client/App.js');
		}

		/////////////////////////////
		///// Setup FileManager /////
		/////////////////////////////

		// Set config files
		const configFiles = getConfigFiles(flags.configDir);
		const fileManager = new FileManager('web', configFiles);
		await fileManager.setup();

		///////////////////////////
		///// Clear build dir /////
		///////////////////////////

		// Delete dir if already exists
		if (fs.existsSync(buildDir)) {
			rimraf.sync(buildDir);
		}

		// Create a new build dir
		shell.mkdir('-p', buildDir);

		////////////////////////////
		///// Generate Configs /////
		////////////////////////////

		let clientConfigs = await fileManager.Hooks.run(`web.client-config`, {}, { buildDir, configDir });

		// Path to bluebase.js file
		const bluebaseJsPath = await fileManager.resolveFilePath('bluebase');
		// const assetsDirPath = await fileManager.resolveFilePath('assets-dir');
		const assetsDirPath = path.join(configDir, 'assets');

		const baseWebpackBuildOptions = {
			appJsPath,
			assetsDirPath,
			bluebaseJsPath,
			buildDirPath: buildDir,
			configDirPath: configDir,
		};

		// ///////////////////////////
		// ///// Webpack Configs /////
		// ///////////////////////////

		const clientWebpackConfigs = await fileManager.Hooks.run(
			`web.client-webpack-config`,
			{},
			{

				...baseWebpackBuildOptions,
				clientConfigs,
				configs: { ...clientConfigs, mode: 'development' },
			});

		// const mainCompiler = webpack(mainWebpackConfigs);

		/////////////////
		///// Build /////
		/////////////////

		Utils.logger.log({
			label: '@bluebase/cli/web-static',
			level: 'info',
			message: `👨‍💻 Compiling BlueBase's client bundle`
		});

		serve({}, {
			config: clientWebpackConfigs,
			// // content: Utils.fromProjectRoot('./build/electron'),
			devMiddleware: {
				publicPath: '/',
				writeToDisk: true,
			},

			add: (app, _middleware, options) => {
				// Be sure to pass the options argument from the arguments
				app.use(webpackServeWaitpage(options, { theme: 'material' }));

				// Make sure the usage of webpack-serve-waitpage will be before the following commands if exists
				// middleware.webpack();
				// middleware.content();
			},

			on: {
				'build-finished': () => {

					// Finish
					Utils.logger.log({
						label: '@bluebase/cli/web-static',
						level: 'info',
						message: '✅ Done!',
					});

				},
			}
		});
	}
}