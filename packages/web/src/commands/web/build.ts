import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { Command } from '@oclif/command';
import { Flags } from '../../cli-flags';
import { webpackCompile } from '../../webpack/webpackCompile';
import fs from 'fs';
import getConfigFiles from '../../configFiles';
import rimraf from 'rimraf';
import shell from 'shelljs';

export class CustomCommand extends Command {
	async run() {

		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: '🏗 Building project...',
		});

		// Absolute path of build dir
		const buildDir = Utils.fromProjectRoot(flags.buildDir);
		const configDir = Utils.fromProjectRoot(flags.configDir);

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

		const clientConfigs = await fileManager.Hooks.run(`web.client-config`, {}, { buildDir, configDir: flags.configDir });
		const serverConfigs = await fileManager.Hooks.run(`web.server-config`, {}, { buildDir, configDir: flags.configDir });

		// Path to bluerain.js file
		const bluerainJsPath = await fileManager.resolveWithFallback('bluerain');
		const assetsDirPath = await fileManager.resolveWithFallback('assets-dir');

		const baseWebpackBuildOptions = {
			assetsDirPath,
			bluerainJsPath,
			buildDirPath: buildDir,
			configDirPath: configDir,
			mode: 'production',
		};

		////////////////////////
		///// Build Client /////
		////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: `🎛 Compiling Webpack Client bundle`
		});

		const webpackClientConfigs = await fileManager.Hooks.run(
			`web.client-webpack-config`,
			{},
			{

				...baseWebpackBuildOptions,

				clientConfigs,
				configs: { ...clientConfigs, mode: 'development' },
				serverConfigs,
				target: 'web',
			});
		const clientStats = await webpackCompile(webpackClientConfigs);

		// tslint:disable-next-line:no-console
		console.log(clientStats.toString({ colors: true }));

		////////////////////////
		///// Build Server /////
		////////////////////////

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
				target: 'node',
			});
		const serverStats = await webpackCompile(webpackServerConfigs);

		// tslint:disable-next-line:no-console
		console.log(serverStats.toString({ colors: true }));

		// Finish
		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: '✅ Done!',
		});
	}
}
