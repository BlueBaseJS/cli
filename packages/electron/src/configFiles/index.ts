import { ConfigFileInfo, getDefaults } from '@bluebase/cli-core';
import path from 'path';

const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export default (configDir: string): ConfigFileInfo[] => {

	const defaults = getDefaults(configDir);

	return [
		{
			...defaults.configs,
			defaultPath: fromHere('main.config'),
			name: '^main.config.(js|ts)$',
			slug: 'main-config',
		},
		{
			...defaults.configs,
			defaultPath: fromHere('renderer.config'),
			name: '^renderer.config.(js|ts)$',
			slug: 'renderer-config',
		},
		{
			...defaults.webpack,
			defaultPath: fromHere('./webpack.config.main'),
			name: '^webpack.config.main.(js|ts)$',
			slug: 'main-webpack-config',
		},
		{
			...defaults.webpack,
			defaultPath: fromHere('./webpack.config.renderer'),
			name: '^webpack.config.renderer.(js|ts)$',
			slug: 'renderer-webpack-config',
		},
		// {

		// 	...defaults.assetsDir,
		// 	defaultPath: fromRoot('templates/web/assets'),
		// },
		defaults.bluebase,
	];
};
