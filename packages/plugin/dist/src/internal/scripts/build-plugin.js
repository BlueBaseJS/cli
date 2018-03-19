'use strict';

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _utils = require('../utils');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _babelConfig = require('../../config/babelConfig');

var _babelConfig2 = _interopRequireDefault(_babelConfig);

var _buildCommand = require('./build-command');

var _buildCommand2 = _interopRequireDefault(_buildCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const outputAppDirPath = (0, _path.resolve)((0, _config2.default)('outputAppDir'));
const shouldUseTsc = !(process.argv.indexOf('--no-tsc') > -1);

if (_fs2.default.existsSync(outputAppDirPath)) {
	(0, _utils.log)({
		title: 'Plugin',
		level: 'warn',
		message: 'Removing dist direcory.'
	});

	// First clear the build output dir.
	(0, _utils.exec)(`rimraf ${outputAppDirPath}`);
}

// Get default or custom bablerc configs  
const babelConfig = (0, _babelConfig2.default)(`${(0, _path.resolve)((0, _config2.default)('bluerainDir'), (0, _config2.default)('bablercFile'))}`);

// generate build command
// getBuildCommand second argument means should we use typescript compiler or not.
const command = (0, _buildCommand2.default)(babelConfig, shouldUseTsc);

// execute buiild command
(0, _child_process.execSync)(command, { stdio: 'inherit', silent: false });

if (shouldUseTsc) {
	(0, _utils.log)({
		title: 'Plugin',
		level: 'warn',
		message: 'Removing compiled direcory.'
	});
	// Clear the compiled dir
	(0, _utils.exec)(`rimraf ${(0, _config2.default)('tsCompiledDir')}`);
}