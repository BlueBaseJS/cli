import { execSync } from 'child_process';
import fs from 'fs';
import { resolve as pathResolve } from 'path';
import { exec, log } from '../utils';
import config from '../../config';
import getBableConfig from '../../config/babelConfig';
import getBuildCommand from './build-command';

const outputAppDirPath = pathResolve(config('outputAppDir'));
const shouldUseTsc = !(process.argv.indexOf('--no-tsc') > -1);

if (fs.existsSync(outputAppDirPath)) {
	log({
		title: 'Plugin',
		level: 'warn',
		message: 'Removing dist direcory.'
	});

	// First clear the build output dir.
	exec(`rimraf ${outputAppDirPath}`);
}

// Get default or custom bablerc configs  
const babelConfig = getBableConfig(`${pathResolve(config('bluerainDir'), config('bablercFile'))}`);

// generate build command
// getBuildCommand second argument means should we use typescript compiler or not.
const command = getBuildCommand(babelConfig, shouldUseTsc);

// execute buiild command
execSync(command, { stdio: 'inherit', silent: false });

if (shouldUseTsc) {
	log({
		title: 'Plugin',
		level: 'warn',
		message: 'Removing compiled direcory.'
	});
	// Clear the compiled dir
	exec(`rimraf ${config('tsCompiledDir')}`);
}
