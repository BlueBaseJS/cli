import { ConfigFileInfo } from '../ConfigFileInfo';
import path from 'path';

const fromHere = (filename: string) => path.resolve(__dirname, filename);

export const getDefaults = (configDir: string) => {

	const defaults: { [key: string]: ConfigFileInfo } = {

		// /** Babel Configs */
		// babel: {
		// defaultPath: fromHere('emptyHook'),
		// dir: configDir,
		// 	findInBlueRain: true,
		// 	findInPlugins: true,
		// 	isDir: false,
		// 	isHook: true,
		// 	name: '^babel.(js|ts)$',
		// 	slug: 'babel',
		// },

		/** BlueRain bluerain options */
		bluerain: {
			defaultPath: fromHere('bluerain'),
			dir: configDir,
			findInBlueRain: true,
			findInPlugins: false,
			isDir: false,
			isHook: false,
			name: '^bluerain.(js|ts)$',
			slug: 'bluerain',
		},

		/** Plaform specific configs */
		configs: {
			defaultPath: fromHere('emptyHook'),
			dir: configDir,
			findInBlueRain: true,
			findInPlugins: true,
			isDir: false,
			isHook: true,
			name: '^configs.(js|ts)$',
			slug: 'configs',
		},

		/** Public directory which has all the assets */
		assetsDir: {
			defaultPath: fromHere('assets'),
			dir: configDir,
			findInBlueRain: true,
			findInPlugins: false,
			isDir: true,
			isHook: false,
			name: 'assets',
			slug: 'assetsDir',
		},

		// /** Typescript config settings */
		// tsconfig: {
		// defaultPath: fromHere('tsconfig'),
		// dir: configDir
		// 	findInBlueRain: true,
		// 	findInPlugins: true,
		// 	isDir: false,
		// 	isHook: true,
		// 	name: '^babel.(js|ts)$',
		// 	slug: 'babel',
		// },

		/** Webpack configs */
		webpack: {
			defaultPath: fromHere('emptyHook'),
			dir: configDir,
			findInBlueRain: true,
			findInPlugins: true,
			isDir: false,
			isHook: true,
			name: '^webpack.config.(js|ts)$',
			slug: 'webpack',
		},
	};

	return defaults;
};
