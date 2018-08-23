import { BRCommand, Utils } from '@blueeast/bluerain-cli-core';
import { ExpoFlags } from '../commands/expo';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';

// import path from 'path';
// import { spawn } from 'child_process';

// const fromRoot = (pathSegment: string) => path.resolve(__dirname, `../../${pathSegment}`);


export const start = async (ctx: any, flags: ExpoFlags): Promise<void> => {

	ctx = ctx as BRCommand;
	const buildDir = Utils.fromProjectRoot(flags.buildDir);
	
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
	
	const appJsPath = path.join(buildDir, 'app.js');
	let data = fs.readFileSync(path.join(__dirname, '../../templates/App.js')).toString();
	data = data.replace('BLUERAIN_JS_PATH', path.resolve(process.cwd(), 'bluerain.js'));
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

	// spawn(
	// 	fromRoot('./node_modules/.bin/expo'),
	// 	['start', '--config', Utils.fromProjectRoot('./build/expo/app.json')],
	// 	{ shell: true, env: process.env, stdio: 'inherit' }
	// )
	// 	.on('close', (_code: number) => process.exit(0))
	// 	.on('error', (spawnError: Error) => console.error(spawnError));

	return;
};
