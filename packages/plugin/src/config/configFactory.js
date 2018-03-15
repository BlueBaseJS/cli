/**
 * Project Configuration.
 *
 * NOTE: All file/folder paths should be relative to the project root. The
 * absolute paths should be resolved during runtime by our build internal/server.
 */

import path from 'path';
import appRootDir from 'app-root-dir';
import projectRootDir from './projectRootDir';

const configFactory = configs => ({
	projectRootDir,

	// Location of root directory of app
	appRootDir: path.resolve(appRootDir.get()),

	// Location of bluerain directory in the project
	bluerainDir: path.resolve(appRootDir.get(), 'bluerain'),

	// path to babel compiler
	babelCompiler: 'node_modules/.bin/babel',

	// Lookup .bablerc file
	bablercFile: '.babelrc',

	// Src folder path in consumer app
	srcAppDir: path.resolve(appRootDir.get(), 'src'),

	// path to babel compiler
	tsCompiler: 'node_modules/.bin/tsc',

	// Typescript compiled directory path in consumer app
	tsCompiledDir: path.resolve(appRootDir.get(), 'compiled'),

	// Output dist path in consumer app
	outputAppDir: path.resolve(appRootDir.get(), 'dist'),

	gitPluginUrl: 'https://github.com/BlueEastCode/bluerain-boilerplate-plugin.git',

	plugins: {
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
		},

		// Merge with incoming configs
		...configs,
	},
});


export default configFactory;
