import { Configuration as WebpackConfig } from 'webpack';
import { Utils } from '@blueeast/bluerain-cli-core';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackBuilder, { WebpackBuilderMiddleware } from "../WebpackBuilder";
import merge from 'webpack-merge';

const HappyPack = require('happypack');

const removeNil = Utils.removeNil;

/**
 * Javascript loader
 * @param config 
 * @param builder 
 */
const LoaderTypescript: WebpackBuilderMiddleware = (config: WebpackConfig, builder: WebpackBuilder): WebpackConfig => {

	const newConfig: any = merge(config, {

		plugins: removeNil([

			// HappyPack 'typescript' instance.
			new HappyPack({
				id: 'happypack-typescript',
				verbose: false,
				// tslint:disable-next-line:object-literal-sort-keys
				threads: 4,
				loaders: [
					{
						loader: builder.useOwn('babel-loader'),
						options: {
							babelrc: false,
							plugins: [builder.useOwn('react-hot-loader/babel')],
						},
					},
					{
						loader: builder.useOwn('ts-loader'),
						options: {
							transpileOnly: true,

							// IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
							happyPackMode: true,
						}
					}
				],
			}),

			// Typescript
			new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
		]),

		// module: {

		// 	rules: [
		// 		{
		// 			// "oneOf" will traverse all imports with following loaders until one will
		// 			// match the requirements. When no loader matches it will fallback to the
		// 			// "file" loader at the end of the loader list.
		// 			oneOf: removeNil([

		// 				// Typescript
		// 				{
		// 					test: /\.tsx?$/,
		// 					exclude: /node_modules/,
		// 					include: removeNil([
		// 						...builder.bundleConfig.srcPaths,
		// 						// ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
		// 					]),
		// 					loader: builder.useOwn('happypack/loader?id=happypack-typescript')
		// 				},

		// 			]),
		// 		},
		// 	],
		// },
	});


	newConfig.module.rules[0].oneOf = [

		// Typescript
		{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			include: removeNil([
				...builder.bundleConfig.srcPaths,
				// ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
			]),
			loader: builder.useOwn('happypack/loader?id=happypack-typescript')
		},
	].concat(newConfig.module.rules[0].oneOf);

	return newConfig;
}

export default LoaderTypescript;