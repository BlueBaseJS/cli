import { FileManager, Utils } from '@bluebase/cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import HotDevelopment from '../../helpers/hotDevelopment';
import fs from 'fs';
import getConfigFiles from '../../configFiles';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';
import webpack from 'webpack';
import deepmerge = require('deepmerge');

// import { webpackCompileDev } from '../../helpers/webpackCompileDev';
// import fromRoot from '../../helpers/fromRoot';

export class CustomCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluebase/cli/web',
			level: 'info',
			message: '🌏 Starting BlueBase on web...',
		});

		// Absolute path of build dir
		let appJsPath = Utils.fromProjectRoot(flags.appJsPath);
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);
		const customWebPackClientConfigPath = Utils.fromProjectRoot(flags.webpackClientConfigPath);
		const customWebPackServerConfigPath = Utils.fromProjectRoot(flags.webpackServerConfigPath);

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
		let serverConfigs = await fileManager.Hooks.run(`web.server-config`, {}, { buildDir, configDir });

		if (fs.existsSync(customWebPackClientConfigPath)) {
			const configs = require(customWebPackClientConfigPath);
			clientConfigs = deepmerge(configs, clientConfigs);
		}

		if (fs.existsSync(customWebPackServerConfigPath)) {
			const configs = require(customWebPackServerConfigPath);
			serverConfigs = deepmerge(configs, serverConfigs);
		}

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
			// mode: 'development',
		};

		//////////////////////////
		///// Client Configs /////
		//////////////////////////

		const webpackClientConfigs = await fileManager.Hooks.run(
			`web.client-webpack-config`,
			{},
			{

				...baseWebpackBuildOptions,

				clientConfigs,
				configs: { ...clientConfigs, mode: 'development' },
				serverConfigs,
			});

		const clientCompiler = webpack(webpackClientConfigs);

		//////////////////////////
		///// Server Configs /////
		//////////////////////////

		Utils.logger.log({
			label: '@bluebase/cli/web',
			level: 'info',
			message: `🎛 Compiling Webpack Server bundle`
		});

		const webpackServerConfigs = await fileManager.Hooks.run(
			`web.server-webpack-config`,
			{},
			{

				...baseWebpackBuildOptions,

				clientConfigs,
				configs: { ...serverConfigs, mode: 'development' },
				serverConfigs,
			});

		const serverCompiler = webpack(webpackServerConfigs);

		/////////////////
		///// Build /////
		/////////////////

		Utils.logger.log({
			label: '@bluebase/cli/web',
			level: 'info',
			message: `👨‍💻 Compiling Webpack Client bundle`
		});

		HotDevelopment({
			...baseWebpackBuildOptions,
			clientCompiler,
			clientConfigs,
			serverCompiler,
			serverConfigs,
			webpackClientConfigs,
			webpackServerConfigs,
		});

		// // Finish
		// Utils.logger.log({
		// 	label: '@bluebase/cli/web',
		// 	level: 'info',
		// 	message: '✅ Done!',
		// });
	}
}
