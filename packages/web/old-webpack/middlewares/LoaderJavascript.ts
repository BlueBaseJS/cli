import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';

const HappyPack = require('happypack');

const removeNil = Utils.removeNil;

/**
 * Javascript loader
 * @param config 
 * @param builder 
 */
const LoaderJavascript: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	const newConfig: any = merge(config, {

		plugins: removeNil([

			// HappyPack 'javascript' instance.
			new HappyPack({
				id: 'happypack-javascript',
				verbose: false,
				// tslint:disable-next-line:object-literal-sort-keys
				threads: 4,
				loaders: [
					{
						// We will use babel to do all our JS processing.
						path: builder.useOwn('babel-loader'),

						// We will create a babel config and pass it through the plugin
						// defined in the project configuration, allowing additional
						// items to be added.
						query:
						// Our "standard" babel config.
						{
							// We need to ensure that we do this otherwise the babelrc will
							// get interpretted and for the current configuration this will mean
							// that it will kill our webpack treeshaking feature as the modules
							// transpilation has not been disabled within in.
							babelrc: false,

							plugins: [
								// Required to support react hot loader.
								builder.ifDevClient(builder.useOwn('react-hot-loader/babel')),

							].filter(x => x != null),
						},
					},
				],
			}),
		]),

		// module: {

		// 	rules: [
		// 		{
		// 			// "oneOf" will traverse all imports with following loaders until one will
		// 			// match the requirements. When no loader matches it will fallback to the
		// 			// "file" loader at the end of the loader list.
		// 			oneOf: removeNil([

		// 				// JAVASCRIPT
		// 				{
		// 					test: /\.jsx?$/,
		// 					// We will defer all our js processing to the happypack plugin
		// 					// named "happypack-javascript".
		// 					// See the respective plugin within the plugins section for full
		// 					// details on what loader is being implemented.
		// 					loader: builder.useOwn('happypack/loader?id=happypack-javascript'),
		// 					include: removeNil([
		// 						...builder.bundleConfig.srcPaths,
		// 						// ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
		// 					]),
		// 				},
		// 			]),
		// 		},
		// 	],
		// },
	});


	newConfig.module.rules[0].oneOf = [

		// JAVASCRIPT
		{
			test: /\.jsx?$/,
			// We will defer all our js processing to the happypack plugin
			// named "happypack-javascript".
			// See the respective plugin within the plugins section for full
			// details on what loader is being implemented.
			loader: builder.useOwn('happypack/loader?id=happypack-javascript'),
			include: removeNil([
				...builder.bundleConfig.srcPaths,
				// ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
			]),
		},
	].concat(newConfig.module.rules[0].oneOf);

	return newConfig;
}

export default LoaderJavascript;