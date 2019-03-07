import { ConfigFileInfo } from '../ConfigFileInfo';
import { fromCore } from '../../utils';
import path from 'path';

const fromHere = (filename: string) => path.resolve(__dirname, filename);

export const getDefaults = (configDir: string) => {

	const defaults: { [key: string]: ConfigFileInfo } = {

		// /** Babel Configs */
		// babel: {
		// defaultPath: fromHere('emptyHook'),
		// dir: configDir,
		// 	findInBlueBase: true,
		// 	findInPlugins: true,
		// 	isDir: false,
		// 	isHook: true,
		// 	name: '^babel.(js|ts)$',
		// 	slug: 'babel',
		// },

		/** BlueBase bluebase options */
		bluebase: {
			defaultPath: fromCore('templates/common/bluebase'),
			dir: configDir,
			findInBlueBase: true,
			findInPlugins: false,
			isDir: false,
			isHook: false,
			name: '^bluebase.(js|ts)$',
			slug: 'bluebase',
		},

		/** Plaform specific configs */
		configs: {
			defaultPath: fromHere('emptyHook'),
			dir: configDir,
			findInBlueBase: true,
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
			findInBlueBase: true,
			findInPlugins: false,
			isDir: true,
			isHook: false,
			name: 'assets',
			slug: 'assets-dir',
		},

		// /** Typescript config settings */
		// tsconfig: {
		// defaultPath: fromHere('tsconfig'),
		// dir: configDir
		// 	findInBlueBase: true,
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
			findInBlueBase: true,
			findInPlugins: true,
			isDir: false,
			isHook: true,
			name: '^webpack.config.(js|ts)$',
			slug: 'webpack',
		},
	};

	return defaults;
};
