import { ConfigFileInfo } from '../models/ConfigFiles';
import { fromBlueRainDir } from '../utils/paths/fromBlueRainDir';
import path from 'path';

const fromHere = (filename: string) => path.resolve(__dirname, filename);

/** Babel Configs */
export const babel: ConfigFileInfo = {
	defaultPath: fromHere('babel'),
	dir: fromBlueRainDir('.'),
	findInBlueRain: true,
	findInPlugins: true,
	isDir: false,
	isHook: true,
	name: '^babel.(js|ts)$',
	slug: 'babel',
};

/** BlueRain boot options */
export const boot: ConfigFileInfo = {
	defaultPath: fromHere('boot'),
	dir: fromBlueRainDir('.'),
	findInBlueRain: true,
	findInPlugins: false,
	isDir: false,
	isHook: false,
	name: '^boot.(js|ts)$',
	slug: 'boot',
};

/** Plaform specific configs */
export const platform: ConfigFileInfo = {
	defaultPath: fromHere('platform'),
	dir: fromBlueRainDir('.'),
	findInBlueRain: true,
	findInPlugins: true,
	isDir: false,
	isHook: true,
	name: '^platform.(js|ts)$',
	slug: 'platform',
};

/** Public directory which has all the assets */
export const publicDir: ConfigFileInfo = {
	defaultPath: fromHere('public'),
	dir: fromBlueRainDir('.'),
	findInBlueRain: true,
	findInPlugins: false,
	isDir: true,
	isHook: false,
	name: 'public',
	slug: 'publicDir',
};

/** Typescript config settings */
export const tsconfig: ConfigFileInfo = {
	defaultPath: fromHere('tsconfig'),
	dir: fromBlueRainDir('.'),
	findInBlueRain: true,
	findInPlugins: true,
	isDir: false,
	isHook: true,
	name: '^babel.(js|ts)$',
	slug: 'babel',
};

/** Webpack configs */
export const webpack: ConfigFileInfo = {
	defaultPath: fromHere('webpack.config'),
	dir: fromBlueRainDir('.'),
	findInBlueRain: true,
	findInPlugins: true,
	isDir: false,
	isHook: true,
	name: '^webpack.config.(js|ts)$',
	slug: 'webpack',
};
