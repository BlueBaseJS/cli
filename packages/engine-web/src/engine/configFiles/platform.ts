// tslint:disable:object-literal-sort-keys
import { PlatformConfigs } from '../PlatformConfigs';
import { Utils } from '@blueeast/bluerain-cli-core';
import path from 'path';

const EnvVars = Utils.EnvVars;

const fromRoot = (file: string) => {
	return path.resolve(__dirname, '..', '..', '..', file);
};

export const DefaultPlatformConfigs: PlatformConfigs = {

	host: EnvVars.string('HOST', '0.0.0.0'),
	port: EnvVars.number('PORT', 1337),
	clientDevServerPort: EnvVars.number('CLIENT_DEV_PORT', 7331),
	welcomeMessage: EnvVars.string('WELCOME_MSG', 'Hello world!'),
	disableSSR: true,
	browserCacheMaxAge: '365d',
	htmlPage: {
		titleTemplate: 'BlueRain - %s',
		defaultTitle: 'BlueRain',
		description:
			'A starter kit giving you the minimum requirements for a production ready universal react application.',
	},
	cspExtensions: {
		childSrc: [],
		connectSrc: [],
		defaultSrc: [],
		fontSrc: [],
		imgSrc: [],
		mediaSrc: [],
		// manifestSrc: [],
		objectSrc: [],
		scriptSrc: [],
		styleSrc: [],
	},

	buildOutputPath: Utils.fromProjectRoot('./build'),
	includeSourceMapsForOptimisedClientBundle: false,
	// bundleSrcTypes: [
	// 	'.web.ts', '.ts',
	// 	'.web.tsx', '.tsx',
	// 	'.web.js', '.js',
	// 	'.web.jsx', '.jsx'
	// ],
	bundleSrcTypes: ['ts', 'tsx', 'js', 'jsx', 'json'],
	bundleAssetsFileName: 'assets.json',
	nodeExternalsFileTypeWhitelist: [
		/\.(eot|woff|woff2|ttf|otf)$/,
		/\.(svg|png|jpg|jpeg|gif|ico)$/,
		/\.(mp4|mp3|ogg|swf|webp)$/,
		/\.(css|scss|sass|sss|less)$/,
	],
	serviceWorker: {
		enabled: true,
		fileName: 'sw.js',
		includePublicAssets: [
			// NOTE: This will include ALL of our public folder assets.  We do
			// a glob pull of them and then map them to /foo paths as all the
			// public folder assets get served off the root of our application.
			// You may or may not want to be including these assets.  Feel free
			// to remove this or instead include only a very specific set of
			// assets.
			'./**/*',
		],
		offlinePageFileName: 'offline.html',
	},

	bundles: {
		client: {
			srcEntryFile: fromRoot('./src/client/index'),
			srcPaths: [
				Utils.fromProjectRoot('./bluerain/boot'),
				Utils.fromProjectRoot('./src'),
				fromRoot('./src/client'),
				// The service worker offline page generation needs access to the
				// config folder.  Don't worry we have guards within the config files
				// to ensure they never get included in a client bundle.
				// fromRoot('./src/config'),
			],
			outputPath: Utils.fromProjectRoot('build/client'),
			webPath: fromRoot('/src/client/'),
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

		server: {
			srcEntryFile: fromRoot('./src/server/index'),
			srcPaths: [
				Utils.fromProjectRoot('./bluerain'),
				fromRoot('./src/server'),
				fromRoot('./src/client/App'),
				// fromRoot('./src/config')
			],
			outputPath: Utils.fromProjectRoot('build/server'),
		},
	},

	additionalNodeBundles: {},
};

export default () => ({ web: DefaultPlatformConfigs });
