// tslint:disable:object-literal-sort-keys
import { ServerConfigs } from '../types';
import { Utils } from '@blueeast/bluerain-cli-core';
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

export default (input: ServerConfigs, args: HookArgs): ServerConfigs => {

	const configs: ServerConfigs = {

		target: 'web',
		mode: Utils.isProduction() ? 'production' : 'development',

		host: EnvVars.string('HOST', '0.0.0.0'),
		port: EnvVars.number('PORT', 1337),

		welcomeMessage: EnvVars.string('WELCOME_MSG', 'Hello world!'),
		disableSSR: true,
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
			Utils.fromProjectRoot('./bluerain'),
			// fromHere('../../server'),
			// fromHere('../../client/App'),
		],
		outputPath: Utils.fromProjectRoot('build/server'),

		nodeExternalsFileTypeWhitelist: [],
	};

	return deepmerge(input, configs);
};
