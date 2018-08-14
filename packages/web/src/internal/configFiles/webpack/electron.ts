import * as webpack from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import WebpackBuilder, { BuildOptions } from './WebpackBuilder';
import BaseConfig from './middlewares/BaseConfig';

const logger = Utils.logger;

export default (webpackConfigInput: webpack.Configuration = {}, buildOptions: BuildOptions): webpack.Configuration => {
	const builder = new WebpackBuilder(buildOptions);
	const configs = builder

		// Base Config
		.use(BaseConfig)	

		// Manually set target to electron
		// TODO: this has to be handled platform configs
		.merge({ target: 'electron' })

		// Finally, merge user input overrides
		.merge(webpackConfigInput)

		// Build
		.build();

	return configs;
}

