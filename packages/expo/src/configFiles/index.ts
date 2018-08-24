import { ConfigFileInfo, getDefaults, } from '@blueeast/bluerain-cli-core';
import path from 'path';

const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export default (configDir: string): ConfigFileInfo[] => {

	const defaults = getDefaults(configDir);

	return [
		{
			...defaults.configs,
			defaultPath: fromHere('configs')
		},
		defaults.bluerain,
	];
};

// const publicDir: ConfigFileInfo = {
// 	...Defaults.ConfigFiles.publicDir,
// 	defaultPath: fromHere('../../../public')
// };

// const webpack: ConfigFileInfo = {
// 	...Defaults.ConfigFiles.webpack,
// 	defaultPath: fromHere('./webpack.config')
// };
