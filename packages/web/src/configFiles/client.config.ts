// tslint:disable:object-literal-sort-keys
import { ClientConfigs } from '../types';
import deepmerge from 'deepmerge';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';
import { isProduction } from '@bluebase/cli-core/lib/utils/logic';
import path from 'path';

export const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export interface HookArgs {
	buildDir: string;
	configDir: string;
}

export default (input: ClientConfigs, args: HookArgs): ClientConfigs => {
	const configs: ClientConfigs = {
		target: 'web',
		mode: isProduction() ? 'production' : 'development',

		devServerHost: '0.0.0.0',
		devServerPort: 1337,
		devDashboardEnable: true,
		devDashboardPort: 7332,

		htmlPage: {
			titleTemplate: 'BlueBase - %s',
			defaultTitle: 'BlueBase',
			description:
				'A starter kit giving you the minimum requirements for a production ready universal react application.',
		},

		// TODO:
		// extensions: [
		// 	'.web.ts', '.ts',
		// 	'.web.tsx', '.tsx',
		// 	'.web.js', '.js',
		// 	'.web.jsx', '.jsx'
		// ],
		extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

		bundleAssetsFileName: 'assets.json',

		srcEntryFile: fromHere('../client/index'),

		includePaths: [
			args.configDir,
			fromProjectRoot('./src'),
			// fromHere('../../client'),
			// The service worker offline page generation needs access to the
			// config folder.  Don't worry we have guards within the config files
			// to ensure they never get included in a client bundle.
			// fromRoot('./src/config'),
		],

		outputPath: path.join(args.buildDir, 'client'),

		publicPath: '/',

		includeSourceMapsForOptimisedBundle: false,

		nodeExternalsFileTypeWhitelist: [],

		// TODO add this in dir path
		favIconConfig: {
			// Your source logo
			logo: './assets/web/icon.png'
		},
		workBox:{
			config:{
				swDest: 'sw.js',
				runtimeCaching: [{
					urlPattern: /^https:\/\/fonts\.googleapis\.com/,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'google-fonts-stylesheets'
					}
				}, {
					urlPattern: /^https:\/\/fonts\.gstatic\.com/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'google-fonts-webfonts',
						expiration: {
							maxEntries: 30,
							maxAgeSeconds: 60 * 60 * 24 * 365
						}
					}
				}, {
					urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'images',
						expiration: {
							maxEntries: 60,
							maxAgeSeconds: 30 * 24 * 60 * 60
						}
					}
				}, {
					urlPattern: /\.(?:js|css)$/,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'static-resources'
					}
				}]
			},
			disable: false
		}

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
