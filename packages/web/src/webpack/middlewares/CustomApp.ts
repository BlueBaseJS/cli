import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import { WebpackBuilderMiddleware } from '../../types';
import fs from 'fs';
import merge from 'webpack-merge';
import path from 'path';

/**
 * Patch React Native imports
 * @param config
 * @param builder
 */
const CustomApp: WebpackBuilderMiddleware = () => (config: WebpackConfig): WebpackConfig => {
	// let CUSTOM_APP_JS = undefined as any;
	const locaiton = 'bluerain/web/App';
	if ((fs.existsSync(Utils.fromProjectRoot(`${locaiton}.js`)) ||
		fs.existsSync(Utils.fromProjectRoot(`${locaiton}.jsx`)) ||
		fs.existsSync(Utils.fromProjectRoot(`${locaiton}.ts`)) ||
		fs.existsSync(Utils.fromProjectRoot(`${locaiton}.tsx`)))) {
		const CUSTOM_APP_JS = path.resolve(Utils.fromProjectRoot(locaiton));
		return merge(config, {
			resolve: {
				alias: {
					CUSTOM_APP_JS
				},
			},
		});
	} else {
		return merge(config, {
			resolve: {
				alias: {
					CUSTOM_APP_JS: './App'
				},
			},
		});
	}
};

export default CustomApp;
