import { Utils } from '@bluebase/cli-core';
import WebpackBuilder from '../WebpackBuilder';
import { WebpackBuilderMiddleware } from '../../types';
// tslint:disable:object-literal-sort-keys
// tslint:disable-next-line: sort-imports
import { Configuration as WebpackConfig } from 'webpack';
import WorkboxPlugin from 'workbox-webpack-plugin';
import merge from 'webpack-merge';

// tslint:disable-next-line:no-var-requires

const removeNil = Utils.removeNil;

/**
 * Javascript loader
 * @param config
 * @param builder
 */
const WorkBox: WebpackBuilderMiddleware = () => (
	config: WebpackConfig,
	builder: WebpackBuilder

): WebpackConfig => {
	const newConfig: any = merge(config, {
		plugins: removeNil([
			// wordbox plugin for PWA
			new WorkboxPlugin.GenerateSW(builder.configs.workBox.config)

			// new WorkboxPlugin.InjectManifest(builder.configs.workBoxConfig)
		]),
	});
	return newConfig;
};

export default WorkBox;
