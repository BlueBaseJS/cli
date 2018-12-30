// tslint:disable:object-literal-sort-keys
import { RendererConfigs } from '../types';
import { Utils } from '@bluebase/cli-core';
import deepmerge from 'deepmerge';
import path from 'path';

// const EnvVars = Utils.EnvVars;

export const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export interface HookArgs {
	buildDir: string,
	configDir: string,
}

export default (input: RendererConfigs, args: HookArgs): RendererConfigs => {
	const configs: RendererConfigs = {

		target: 'web',
		mode: Utils.isProduction() ? 'production' : 'development',

		// devServerHost: EnvVars.string('HOST', '0.0.0.0'),
		// devServerPort: EnvVars.number('PORT', 1337),
		// devDashboardEnable: EnvVars.bool('CLIENT_DEV_DASHBOARD_ENABLE', true),
		// devDashboardPort: EnvVars.number('CLIENT_DEV_DASHBOARD_PORT', 7332),

		// htmlPage: {
		// 	titleTemplate: 'BlueBase - %s',
		// 	defaultTitle: 'BlueBase',
		// 	description:
		// 		'A starter kit giving you the minimum requirements for a production ready universal react application.',
		// },

		// TODO:
		// extensions: [
		// 	'.web.ts', '.ts',
		// 	'.web.tsx', '.tsx',
		// 	'.web.js', '.js',
		// 	'.web.jsx', '.jsx'
		// ],
		extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

		// bundleAssetsFileName: 'assets.json',

		srcEntryFile: fromHere('../client/index'),

		includePaths: [
			args.configDir,
			Utils.fromProjectRoot('./src'),
			// fromHere('../../client'),
			// The service worker offline page generation needs access to the
			// config folder.  Don't worry we have guards within the config files
			// to ensure they never get included in a client bundle.
			// fromRoot('./src/config'),
		],

		outputPath: path.join(args.buildDir, 'client'),

		// publicPath: '/',

		// includeSourceMapsForOptimisedBundle: false,

		// nodeExternalsFileTypeWhitelist: [],
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
