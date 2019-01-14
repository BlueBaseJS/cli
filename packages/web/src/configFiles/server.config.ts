// tslint:disable:object-literal-sort-keys
import { ServerConfigs } from '../types';
import { isProduction } from '@bluebase/cli-core/lib/utils/logic';
import { fromProjectRoot } from '@bluebase/cli-core/lib/utils/paths';
import deepmerge from 'deepmerge';
// import { fromRoot } from '../helpers';
import path from 'path';

export const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export interface HookArgs {
	buildDir: string,
	configDir: string,
}

export default (input: ServerConfigs, args: HookArgs): ServerConfigs => {

	const configs: ServerConfigs = {

		target: 'node',
		mode: isProduction() ? 'production' : 'development',

		host: '0.0.0.0',
		port: 2337,

		welcomeMessage: 'Hello world!',
		disableSSR: false,
		browserCacheMaxAge: '365d',
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

		// TODO:
		// extensions: [
		// 	'.web.ts', '.ts',
		// 	'.web.tsx', '.tsx',
		// 	'.web.js', '.js',
		// 	'.web.jsx', '.jsx'
		// ],
		extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

		srcEntryFile: fromHere('../server/index'),
		includePaths: [
			args.configDir,
			fromProjectRoot('./src'),
			// fromRoot('node_modules')
			// fromHere('../../server'),
			// fromHere('../../client/App'),
		],
		outputPath: path.join(args.buildDir, 'server'),

		nodeExternalsFileTypeWhitelist: [
			/\.(eot|woff|woff2|ttf|otf)$/,
			/\.(svg|png|jpg|jpeg|gif|ico)$/,
			/\.(mp4|mp3|ogg|swf|webp)$/,
			/\.(css|scss|sass|sss|less)$/,
		],
	};

	return deepmerge(input, configs);
};
