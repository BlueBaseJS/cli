import { FileManager, Utils } from '@bluebase/cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import { fromRoot } from '../../scripts';
import fs from 'fs';
import getConfigFiles from '../../configFiles';
import path from 'path';
import rimraf from 'rimraf';
import serve from 'webpack-serve';
import shell from 'shelljs';
import webpack from 'webpack';

const { spawn } = require('child_process');
const webpackServeWaitpage = require('webpack-serve-waitpage');

// import { webpackCompileDev } from '../../scripts/webpackCompileDev';
// import fromRoot from '../../scripts/fromRoot';

export class CustomCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluebase/cli/electron',
			level: 'info',
			message: '🌏 Starting BlueBase on electron...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);
		// const appJsPath = Utils.fromProjectRoot(flags.appJsPath);
		// const customWebPackClientConfigPath = Utils.fromProjectRoot(flags.webpackClientConfigPath);
		// const customWebPackServerConfigPath = Utils.fromProjectRoot(flags.webpackServerConfigPath);

		/////////////////////////////
		///// Setup FileManager /////
		/////////////////////////////

		// Set config files
		const configFiles = getConfigFiles(flags.configDir);
		const fileManager = new FileManager('electron', configFiles);
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

		const mainConfigs = await fileManager.Hooks.run(`electron.main-config`, {}, { buildDir, configDir });
		const rendererConfigs = await fileManager.Hooks.run(`electron.renderer-config`, {}, { buildDir, configDir });


		// Path to bluebase.js file
		const bluebaseJsPath = await fileManager.resolveFilePath('bluebase');
		// const assetsDirPath = await fileManager.resolveFilePath('assets-dir');
		const assetsDirPath = path.join(configDir, 'assets');

		const baseWebpackBuildOptions = {
			// appJsPath,
			assetsDirPath,
			bluebaseJsPath,
			buildDirPath: buildDir,
			configDirPath: configDir,
			// mode: 'development',
		};

		//////////////////////////
		///// Main Configs /////
		//////////////////////////

		const mainWebpackConfigs = await fileManager.Hooks.run(
			`electron.main-webpack-config`,
			{},
			{

				...baseWebpackBuildOptions,

				configs: { ...mainConfigs, mode: 'development' },
				mainConfigs,
				rendererConfigs,
			});

		const mainCompiler = webpack(mainWebpackConfigs);

		////////////////////////////
		///// Renderer Configs /////
		////////////////////////////

		const rendererWebpackConfigs = await fileManager.Hooks.run(
			`electron.renderer-webpack-config`,
			{},
			{

				...baseWebpackBuildOptions,

				configs: { ...rendererConfigs, mode: 'development' },
				mainConfigs,
				rendererConfigs,
			});

		// const rendererCompiler = webpack(rendererWebpackConfigs);

		/////////////////
		///// Build /////
		/////////////////

		Utils.logger.log({
			label: '@bluebase/cli/electron',
			level: 'info',
			message: `👨‍💻 Compiling Electron's Main bundle`
		});

		mainCompiler.run((err, _stats) => {
			if (err) { throw err; }

			Utils.logger.log({
				label: '@bluebase/cli/electron',
				level: 'info',
				message: `👨‍💻 Compiling Electron's Renderer bundle`
			});

			serve({}, {
				config: rendererWebpackConfigs,
				// content: Utils.fromProjectRoot('./build/electron'),
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
					'build-started': () => {

						// Finish
						Utils.logger.log({
							label: '@bluebase/cli/electron',
							level: 'info',
							message: '✅ Done!',
						});

						spawn(
							fromRoot('./node_modules/.bin/electron'),
							['./build/electron/main.js'],
							{ shell: true, env: process.env, stdio: 'inherit' }
						)
							.on('close', (_code: number) => process.exit(0))
							.on('error', (spawnError: Error) => Utils.logger.error(spawnError));
					},
				}
			}).then((_result: any) => {
				Utils.logger.log({
					label: '@bluebase/cli/electron',
					level: 'info',
					message: '🚀 Launching!',
				});
			});
		});
	}
}