import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import fs from 'fs';
import getConfigFiles from '../../configFiles';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';
import webpack from 'webpack';
import HotDevelopment from '../../scripts/hotDevelopment';

// import { webpackCompileDev } from '../../scripts/webpackCompileDev';
// import fromRoot from '../../scripts/fromRoot';

export class CustomCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: '🌏 Starting BlueRain on web...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);
		const appJsPath = Utils.fromProjectRoot(flags.appJsPath);

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

		const clientConfigs = await fileManager.Hooks.run(`web.client-config`, {}, { buildDir, configDir });
		const serverConfigs = await fileManager.Hooks.run(`web.server-config`, {}, { buildDir, configDir });

		// Path to bluerain.js file
		const bluerainJsPath = await fileManager.resolveFilePath('bluerain');
		// const assetsDirPath = await fileManager.resolveFilePath('assets-dir');
		const assetsDirPath = path.join(configDir, 'assets');

		const baseWebpackBuildOptions = {
			appJsPath,
			assetsDirPath,
			bluerainJsPath,
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
			label: '@bluerain/cli/web',
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
			label: '@bluerain/cli/web',
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
		// 	label: '@bluerain/cli/web',
		// 	level: 'info',
		// 	message: '✅ Done!',
		// });
	}
}