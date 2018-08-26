// import { ConfigsBundle, getWebpackConfigsFn } from '.';
// import { Utils } from '@blueeast/bluerain-cli-core';
// import HotClientServer from './hotClientServer';
// import HotNodeServer from './hotNodeServer';
// import createVendorDLL from './createVendorDLL';
// import webpack from 'webpack';

// const logger = Utils.logger;

// const usesDevVendorDLL = (bundleConfig: any) =>
//   bundleConfig.devVendorDLL != null && bundleConfig.devVendorDLL.enabled;

// const vendorDLLsFailed = (err: Error) => {
// 	logger.log({
// 		error: err,
// 		label: 'BlueRain Dev',
// 		level: 'error',
// 		message:
// 		// tslint:disable-next-line:max-line-length
// 		'Unfortunately an error occured whilst trying to build the vendor dll(s) used by the development server. Please check the console for more information.',
// 		notify: true,
// 	});
// };

// const initializeBundle = (name: string, bundleConfig: any, getWebpackConfigs: any) => {
// 	const createCompiler = () => {
// 		try {
// 			const webpackConfig = getWebpackConfigs({
// 				mode: 'development',
// 				target: name,
// 			});

//       // Install the vendor DLL config for the client bundle if required.
// 			if (name === 'client' && usesDevVendorDLL(bundleConfig)) {

// 				const plugin = new webpack.DllReferencePlugin({
// 					context: Utils.fromProjectRoot(''),
// 					manifest: require(Utils.fromProjectRoot(
// 						`${bundleConfig.outputPath}/${bundleConfig.devVendorDLL.name}.json`,
// 					)),
// 				});

//         // Install the vendor DLL plugin.
// 				webpackConfig.plugins.push(plugin);
// 			}
// 			return webpack(webpackConfig);
// 		} catch (err) {

// 			logger.log({
// 				error: err,
// 				label: `BlueRain CLI: ${name}`,
// 				level: 'error',
// 				message: 'Webpack config is invalid, please check the console for more information.',
// 				notify: true,
// 			});
// 			throw err;
// 		}
// 	};

// 	return { name, bundleConfig, createCompiler };
// };

// class HotDevelopment {

// 	private hotClientServer: any;
// 	private hotNodeServers: any;

// 	async start(configs: ConfigsBundle, getWebpackConfigs: getWebpackConfigsFn) {
// 		this.hotClientServer = null;
// 		this.hotNodeServers = [];

// 		const clientBundle = initializeBundle('client', configs.bundles.client, getWebpackConfigs);

// 		const nodeBundles = [initializeBundle('server', configs.bundles.server, getWebpackConfigs)].concat(
// 			Object.keys(configs.additionalNodeBundles).map(name =>
// 				initializeBundle(name, configs.additionalNodeBundles[name], getWebpackConfigs),
//       ),
// 		);

// 		if (usesDevVendorDLL(configs.bundles.client)) {
// 			await createVendorDLL('client', configs.bundles.client, configs);
// 		}

// 		const { createCompiler } = clientBundle;
// 		const compiler = createCompiler();
// 		this.hotClientServer = new HotClientServer(compiler, configs);

// 		function clientCompilerDone(){
// 			return new Promise((resolve) => {
// 				// const { createCompiler } = clientBundle;
// 				// const compiler = createCompiler();
// 				compiler.plugin('done', (stats) => {
// 					if (!stats.hasErrors()) {
// 						resolve(compiler);
// 					}
// 				});
// 			});
// 		}

// 		try {
// 			await clientCompilerDone();
// 		} catch (error) {
// 			return vendorDLLsFailed(error);
// 		}

// 		this.hotNodeServers = nodeBundles.map(
// 			({ name, createCompiler }) =>
// 				new HotNodeServer(name, createCompiler(), compiler, configs),
// 		);

// 	}

// 	dispose() {
// 		const safeDisposer = (server: any) => (server ? server.dispose() : Promise.resolve());

//     // First the hot client server.
// 		return (
//       safeDisposer(this.hotClientServer)
//         // Then dispose the hot node server(s).
// 				.then(() => Promise.all(this.hotNodeServers.map(safeDisposer)))
// 		);
// 	}
// }

// export default HotDevelopment;
