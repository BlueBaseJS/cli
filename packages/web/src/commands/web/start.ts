import { FileManager, Utils } from '@blueeast/bluerain-cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import { HotClientServer } from '../../dev/HotClientServer';
// import { HotNodeServer } from '../../dev/HotNodeServer';
// import { webpackCompileDev } from '../../scripts/webpackCompileDev';
import fs from 'fs';
// import fromRoot from '../../scripts/fromRoot';
import getConfigFiles from '../../configFiles';
import path from 'path';
import rimraf from 'rimraf';
import server from '../../server/server';
import shell from 'shelljs';
import webpack from 'webpack';

export class CustomCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: '🏗 Building project...',
		});

		debugger;
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

		const clientConfigs = await fileManager.Hooks.run(`web.client-config`, {}, { buildDir, configDir });
		const serverConfigs = await fileManager.Hooks.run(`web.server-config`, {}, { buildDir, configDir });

		// Path to bluerain.js file
		const bluerainJsPath = await fileManager.resolveFilePath('bluerain');
		// const assetsDirPath = await fileManager.resolveFilePath('assets-dir');
		const assetsDirPath = path.join(configDir, 'assets');

		const baseWebpackBuildOptions = {
			assetsDirPath,
			bluerainJsPath,
			buildDirPath: buildDir,
			configDirPath: configDir,
			// mode: 'development',
		};

		// ///////////////////////////
		// ///// Generate app.js /////
		// ///////////////////////////

		// // Remove (.ts|.js) extension
		// const bluerainJsPathNoExt = bluerainJsPath.replace(/\.[^/.]+$/, '');

		// // Where do we save this file?
		// const appEntryPath = path.join(buildDir, 'AppEntry.js');

		// // Inject bluerain.js path in template
		// let data = fs.readFileSync(fromRoot('./templates/AppEntry.js')).toString();
		// data = data.replace('BLUERAIN_JS_PATH', path.relative(buildDir, bluerainJsPathNoExt));

		// // Save file
		// fs.writeFileSync(appEntryPath, data);

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
			});

		const clientCompiler = webpack(webpackClientConfigs);

		// const clientStats = await webpackCompileDev(webpackClientConfigs);

		// tslint:disable-next-line:no-console
		// console.log(clientStats);

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
			});

		const serverCompiler = webpack(webpackServerConfigs);





		server({
			assetsDirPath,
			client: clientConfigs,
			server: serverConfigs,
		});









		// const serverStats = await webpackCompiler(compiler);

		// // tslint:disable-next-line:no-console
		// console.log(serverStats.toString({ colors: true }));

		// const cpath = compiler.options.output && compiler.options.output.path;
		// const centry = compiler.options.entry || {};

		// const compiledEntryFile = Utils.fromProjectRoot(
		// 	`${cpath}/${Object.keys(centry)[0]}`
		// );

		// // const server = await import(compiledEntryFile);
		// spawn('node', [compiledEntryFile, '--color']);








		const hotClient = new HotClientServer({
			...baseWebpackBuildOptions,
			clientCompiler,
			clientConfigs: webpackClientConfigs,
			serverCompiler,
			serverConfigs: webpackServerConfigs,
		});

		// const hotNode = new HotNodeServer({
		// 	...baseWebpackBuildOptions,
		// 	clientCompiler,
		// 	clientConfigs: webpackClientConfigs,
		// 	serverCompiler,
		// 	serverConfigs: webpackServerConfigs,
		// });

		hotClient.start();
		// hotNode.start();


		// Finish
		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: '✅ Done!',
		});
	}
}
