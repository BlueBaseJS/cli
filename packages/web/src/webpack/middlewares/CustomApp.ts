import { Configuration as WebpackConfig } from 'webpack';
import { WebpackBuilderMiddleware } from '../../types';
import WebpackBuilder from '../WebpackBuilder';
import fs from 'fs';
import merge from 'webpack-merge';
import path from 'path';

/**
 * Patch React Native imports
 * @param config
 * @param builder
 */
const CustomApp: WebpackBuilderMiddleware = () => (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {
	const CUSTOM_APP_JS = builder.appJsPath;
	if (fs.existsSync(`${CUSTOM_APP_JS}.js`) ||
		fs.existsSync(`${CUSTOM_APP_JS}.jsx`) ||
		fs.existsSync(`${CUSTOM_APP_JS}.ts`) ||
		fs.existsSync(`${CUSTOM_APP_JS}.tsx`)) {
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
					CUSTOM_APP_JS: path.join(__dirname, '../../client/App')
				},
			},
		});
	}
};

export default CustomApp;
