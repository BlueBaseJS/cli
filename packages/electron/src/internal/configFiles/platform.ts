// tslint:disable:object-literal-sort-keys

import { PlatformConfigs } from './PlatformConfigs';
import { Utils } from '@blueeast/bluerain-cli-core';
import path from 'path';

const EnvVars = Utils.EnvVars;

// const fromRoot = (file: string) => {
// 	return path.resolve(__dirname, '..', '..', '..', file);
// };

export const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export const DefaultPlatformConfigs: PlatformConfigs = {

	target: 'electron',

	host: EnvVars.string('HOST', '0.0.0.0'),
	port: EnvVars.number('PORT', 1437),

	clientDevDashboardPort: EnvVars.number('CLIENT_DEV_DASHBOARD_PORT', 1438),
	disableDevDashboard: false,

	buildOutputPath: Utils.fromProjectRoot('./build'),
	includeSourceMapsForOptimisedClientBundle: false,
	// TODO:
	// bundleSrcTypes: [
	// 	'.electron.ts', '.ts',
	// 	'.electron.tsx', '.tsx',
	// 	'.electron.js', '.js',
	// 	'.electron.jsx', '.jsx'
	// ],
	bundleSrcTypes: ['ts', 'tsx', 'js', 'jsx', 'json'],
	nodeExternalsFileTypeWhitelist: [
		/\.(eot|woff|woff2|ttf|otf)$/,
		/\.(svg|png|jpg|jpeg|gif|ico)$/,
		/\.(mp4|mp3|ogg|swf|webp)$/,
		/\.(css|scss|sass|sss|less)$/,
	],

	bundles: {
		client: {
			srcEntryFile: fromHere('../../client/index'),
			srcPaths: [
				Utils.fromProjectRoot('./bluerain/boot'),
				Utils.fromProjectRoot('./src'),
				// fromHere('../../client'),
				// The service worker offline page generation needs access to the
				// config folder.  Don't worry we have guards within the config files
				// to ensure they never get included in a client bundle.
				// fromRoot('./src/config'),
			],
			outputPath: Utils.fromProjectRoot('build/client'),
			webPath: '/client',
			devVendorDLL: {
				enabled: true,
				include: [
					'react',
					'react-dom',
					// 'react-helmet',
					// 'react-router-dom',
				],

				name: '__dev_vendor_dll__',
			},
		},
	},
};

export default () => ({ electron: DefaultPlatformConfigs });
