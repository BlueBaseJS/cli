import { BRCommand, Utils } from '@blueeast/bluerain-cli-core';
import { ExpoFlags } from '../commands/expo';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';
import { spawn } from 'child_process';
import fromRoot from '../scripts/fromRoot';

export const start = async (ctx: any, flags: ExpoFlags): Promise<void> => {

	ctx = ctx as BRCommand;

	// Absolute path of build dir
	const buildDir = Utils.fromProjectRoot(flags.buildDir);
	
	// Path to blueeast.js file
	let blueeastJsPath = await ctx.fileManager.resolveWithFallback('bluerain');
	
	// Remove (.ts|.js) extension
	blueeastJsPath = blueeastJsPath.replace(/\.[^/.]+$/, '');

	Utils.logger.log({
		label: '@bluerain/cli/expo',
		level: 'info',
		message: '🏗 Building project...',
	});

	///////////////////////////
	///// Clear build dir /////
	///////////////////////////

	// Delete dir if already exists
	if (fs.existsSync(buildDir)) {
		rimraf.sync(buildDir);
	}

	// Create a new build dir
	shell.mkdir('-p', buildDir);	

	/////////////////////////////
	///// Generate app.json /////
	/////////////////////////////

	const configs = ctx.fileManager.configs;
	const appJson = { expo: configs.manifest };
	const appJsonPath = path.join(buildDir, 'app.json');

	fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
	
	///////////////////////////
	///// Generate app.js /////
	///////////////////////////
	
	
	const appJsPath = path.join(buildDir, 'App.js');
	let data = fs.readFileSync(path.join(__dirname, '../../templates/App.js')).toString();
	data = data.replace('BLUERAIN_JS_PATH', path.relative(buildDir, blueeastJsPath));
	fs.writeFileSync(appJsPath, data);

	////////////////////////////
	///// Copy other files /////
	////////////////////////////

	// AppEntry.js
	shell.cp('-u', 
		path.join(__dirname, '../../templates/AppEntry.js'), 
		path.join(buildDir, 'AppEntry.js')
	);

	///////////////////////
	///// Launch expo /////
	///////////////////////

	Utils.logger.log({
		label: '@bluerain/cli/expo',
		level: 'info',
		message: '🚀 Launching expo',
	});

	spawn(
		fromRoot('./node_modules/.bin/expo'),
		['start', '--config', Utils.fromProjectRoot(appJsonPath)],
		{ shell: true, env: process.env, stdio: 'inherit' }
	)
		.on('close', (_code: number) => process.exit(0))
		.on('error', (spawnError: Error) => console.error(spawnError));

	return;
};
