'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = buildPluginCommand;

var _path = require('path');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// final command
let command = '';
function babelCommand(babelConfig, str, shouldUseTsCompiler) {
	const babelLookUpDir = shouldUseTsCompiler ? (0, _config2.default)('tsCompiledDir') : (0, _path.resolve)((0, _config2.default)('appRootDir'), 'src');
	str += `${(0, _config2.default)('babelCompiler')} -D ${babelLookUpDir} -d ${(0, _config2.default)('outputAppDir')}`;

	if (babelConfig.presets) {
		str += ` --no-babelrc --presets=${babelConfig.presets.join(',')}`;
	}

	return str;
}

// Generate typescript command
function tsCommand(str) {
	return `${(0, _config2.default)('tsCompiler')} --p ${(0, _config2.default)('appRootDir')}`;
}

function buildPluginCommand(babelConfig, shouldUseTsCompiler) {
	if (shouldUseTsCompiler) {
		(0, _utils.log)({
			title: 'tscompiler',
			level: 'info',
			message: 'Using typescript compiler'
		});
		command = `${tsCommand(command)} && `;
	}
	return `${babelCommand(babelConfig, command, shouldUseTsCompiler)}`;
}