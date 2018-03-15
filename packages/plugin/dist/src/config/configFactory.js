'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Project Configuration.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * NOTE: All file/folder paths should be relative to the project root. The
                                                                                                                                                                                                                                                                   * absolute paths should be resolved during runtime by our build internal/server.
                                                                                                                                                                                                                                                                   */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appRootDir = require('app-root-dir');

var _appRootDir2 = _interopRequireDefault(_appRootDir);

var _projectRootDir = require('./projectRootDir');

var _projectRootDir2 = _interopRequireDefault(_projectRootDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configFactory = configs => ({
	projectRootDir: _projectRootDir2.default,

	// Location of root directory of app
	appRootDir: _path2.default.resolve(_appRootDir2.default.get()),

	// Location of bluerain directory in the project
	bluerainDir: _path2.default.resolve(_appRootDir2.default.get(), 'bluerain'),

	// path to babel compiler
	babelCompiler: 'node_modules/.bin/babel',

	// Lookup .bablerc file
	bablercFile: '.babelrc',

	// Src folder path in consumer app
	srcAppDir: _path2.default.resolve(_appRootDir2.default.get(), 'src'),

	// path to babel compiler
	tsCompiler: 'node_modules/.bin/tsc',

	// Typescript compiled directory path in consumer app
	tsCompiledDir: _path2.default.resolve(_appRootDir2.default.get(), 'compiled'),

	// Output dist path in consumer app
	outputAppDir: _path2.default.resolve(_appRootDir2.default.get(), 'dist'),

	plugins: _extends({
		// This plugin allows you to provide final adjustments your babel
		// configurations for each bundle before they get processed.
		//
		// This function will be called once for each for your bundles.  It will be
		// provided the current webpack config, as well as the buildOptions which
		// detail which bundle and mode is being targetted for the current function run.
		babelConfig: (babelConfig, buildOptions) => {
			// eslint-disable-next-line no-unused-vars
			const { target, mode } = buildOptions;

			// Example
			/*
   if (target === 'server' && mode === 'development') {
   babelConfig.presets.push('foo');
   }
   */

			return babelConfig;
		}

	}, configs)
});

exports.default = configFactory;