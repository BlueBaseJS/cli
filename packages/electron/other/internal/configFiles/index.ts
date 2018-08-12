import { ConfigFileInfo, Defaults } from '@blueeast/bluerain-cli-core';
import path from 'path';

export const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

const platform: ConfigFileInfo = {
	...Defaults.ConfigFiles.platform,
	defaultPath: fromHere('platform')
};

const publicDir: ConfigFileInfo = {
	...Defaults.ConfigFiles.publicDir,
	defaultPath: fromHere('../../public')
};

const webpack: ConfigFileInfo = {
	...Defaults.ConfigFiles.webpack,
	defaultPath: fromHere('webpack.config')
};

export const ConfigFiles: ConfigFileInfo[] = [
	Defaults.ConfigFiles.babel,
	Defaults.ConfigFiles.boot,
	platform,
	publicDir,
	webpack
];
