// tslint:disable:object-literal-sort-keys
import { MainConfigs } from '../types';
import { Utils } from '@bluebase/cli-core';
import deepmerge from 'deepmerge';
import path from 'path';

const EnvVars = Utils.EnvVars;

export const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export interface HookArgs {
	buildDir: string,
	configDir: string,
}

export default (input: MainConfigs, args: HookArgs): MainConfigs => {
	const configs: MainConfigs = {

		mode: Utils.isProduction() ? 'production' : 'development',
		target: 'electron-main',

		host: EnvVars.string('HOST', '0.0.0.0'),
		port: EnvVars.number('PORT', 9090),

		devDashboardEnable: EnvVars.bool('CLIENT_DEV_DASHBOARD_ENABLE', true),
		devDashboardPort: EnvVars.number('CLIENT_DEV_DASHBOARD_PORT', 7332),

		// TODO:
		// extensions: [
		// 	'.web.ts', '.ts',
		// 	'.web.tsx', '.tsx',
		// 	'.web.js', '.js',
		// 	'.web.jsx', '.jsx'
		// ],
		extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

		bundleAssetsFileName: 'assets.json',

		srcEntryFile: fromHere('../app/main_process'),

		includePaths: [
			args.configDir,
			Utils.fromProjectRoot('./src'),
			// fromHere('../../client'),
			// The service worker offline page generation needs access to the
			// config folder.  Don't worry we have guards within the config files
			// to ensure they never get included in a client bundle.
			// fromRoot('./src/config'),
		],


		outputPath: path.join(args.buildDir, 'main'),

		publicPath: 'build/',

		includeSourceMapsForOptimisedBundle: false,

		nodeExternalsFileTypeWhitelist: [],
			// devVendorDLL: {

			// 	enabled: true,

			// 	include: [
			// 		'react',
			// 		'react-dom',
			// 		// 'react-helmet',
			// 		// 'react-router-dom',
			// 	],

			// 	name: '__dev_vendor_dll__',
			// },

	};

	return deepmerge(input, configs);
};
