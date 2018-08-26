import { ConfigFileInfo, getDefaults, } from '@blueeast/bluerain-cli-core';
// import fromRoot from '../scripts/fromRoot';
import path from 'path';

const fromHere = (file: string) => {
	return path.resolve(__dirname, file);
};

export default (configDir: string): ConfigFileInfo[] => {

	const defaults = getDefaults(configDir);

	return [
		{
			...defaults.configs,
			defaultPath: fromHere('client.config'),
			name: '^client.config.(js|ts)$',
			slug: 'client-config',
		},
		{
			...defaults.configs,
			defaultPath: fromHere('server.config'),
			name: '^server.config.(js|ts)$',
			slug: 'server-config',
		},
		{
			...defaults.webpack,
			defaultPath: fromHere('./webpack.config.client'),
			name: '^webpack.config.client.(js|ts)$',
			slug: 'client-webpack-config',
		},
		{
			...defaults.webpack,
			defaultPath: fromHere('./webpack.config.server'),
			name: '^webpack.config.server.(js|ts)$',
			slug: 'server-webpack-config',
		},
		// {

		// 	...defaults.assetsDir,
		// 	defaultPath: fromRoot('templates/web/assets'),
		// },
		defaults.bluerain,
	];
};
