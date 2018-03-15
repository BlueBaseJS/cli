import { resolve as pathReslove } from 'path';
import config from '../../config';
import { log } from '../utils';

// final command
let command = '';
function babelCommand(babelConfig, str, shouldUseTsCompiler) {
	const babelLookUpDir = shouldUseTsCompiler ? config('tsCompiledDir') : pathReslove(config('appRootDir'), 'src');
	str += `${config('babelCompiler')} -D ${babelLookUpDir} -d ${config('outputAppDir')}`;

	if (babelConfig.presets) {
		str += ` --no-babelrc --presets=${babelConfig.presets.join(',')}`;
	}

	return str;
}

// Generate typescript command
function tsCommand(str) {
	return `${config('tsCompiler')} --p ${config('appRootDir')}`;
}

export default function buildPluginCommand(babelConfig, shouldUseTsCompiler) {
	if (shouldUseTsCompiler) {
		log({
			title: 'tscompiler',
			level: 'info',
			message: 'Using typescript compiler'
		});
		command = `${tsCommand(command)} && `;
	}
	return `${babelCommand(babelConfig, command, shouldUseTsCompiler)}`;
}
