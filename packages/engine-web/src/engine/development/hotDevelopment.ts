import webpack from 'webpack';
import HotNodeServer from './hotNodeServer';
import HotClientServer from './hotClientServer';
import createVendorDLL from './createVendorDLL';
import { Utils } from '@blueeast/bluerain-cli-core';
import logger from '../../logger';
import { ConfigsBundle, getWebpackConfigsFn } from '.';

const usesDevVendorDLL = (bundleConfig: any) =>
  bundleConfig.devVendorDLL != null && bundleConfig.devVendorDLL.enabled;

const vendorDLLsFailed = (err: Error) => {
	logger.log({
		title: 'vendorDLL',
		level: 'error',
		message:
			'Unfortunately an error occured whilst trying to build the vendor dll(s) used by the development server. Please check the console for more information.',
		notify: true,
	});

	if (err) {
    console.error(err);
  }
};

const initializeBundle = (name: string, bundleConfig: any, getWebpackConfigs: any) => {
  const createCompiler = () => {
    try {
			const webpackConfig = getWebpackConfigs({
        target: name,
        mode: 'development',
      });
      // Install the vendor DLL config for the client bundle if required.
      if (name === 'client' && usesDevVendorDLL(bundleConfig)) {
        // Install the vendor DLL plugin.
        webpackConfig.plugins.push(
          new webpack.DllReferencePlugin({
						context: Utils.fromProjectRoot(''),
						manifest: require(Utils.fromProjectRoot(
							`${bundleConfig.outputPath}/${bundleConfig.devVendorDLL.name}.json`,
            )),
          }),
        );
      }
      return webpack(webpackConfig);
    } catch (err) {
			logger.log({
				title: `Development: ${name}`,
				level: 'error',
				message: 'Webpack config is invalid, please check the console for more information.',
				notify: true,
			});
			console.error(err);
			throw err;
    }
  };

  return { name, bundleConfig, createCompiler };
};

class HotDevelopment {

	private hotClientServer: any;
	private hotNodeServers: any;

	async start(configs: ConfigsBundle, getWebpackConfigs: getWebpackConfigsFn) {
    this.hotClientServer = null;
    this.hotNodeServers = [];

		const clientBundle = initializeBundle('client', configs.bundles.client, getWebpackConfigs);

		const nodeBundles = [initializeBundle('server', configs.bundles.server, getWebpackConfigs)].concat(
			Object.keys(configs.additionalNodeBundles).map(name =>
				initializeBundle(name, configs.additionalNodeBundles[name], getWebpackConfigs),
      ),
    );

		// if (usesDevVendorDLL(configs.bundles.client)) {
		// 	await createVendorDLL('client', configs.bundles.client, configs);
		// }

		// try {
		// 	const { createCompiler } = clientBundle;
		// 	const clientCompiler = createCompiler();

		// 	clientCompiler.plugin('done', (stats) => {
		// 		if (stats.hasErrors()) {
		// 			throw Error();
		// 		}

		// 		this.hotClientServer = new HotClientServer(clientCompiler, configs);
		// 		this.hotNodeServers = nodeBundles.map(
		// 			({ name, createCompiler }) =>
		// 				new HotNodeServer(name, createCompiler(), clientCompiler),
		// 		);

		// 	});

		// } catch (error) {
		// 	vendorDLLsFailed(error);
		// }


    Promise.resolve(
      // First ensure the client dev vendor DLLs is created if needed.
			usesDevVendorDLL(configs.bundles.client)
				? await createVendorDLL('client', configs.bundles.client, configs)
        : true,
    )
      // Then start the client development server.
      .then(
        () =>
          new Promise((resolve) => {
            const { createCompiler } = clientBundle;
            const compiler = createCompiler();
            compiler.plugin('done', (stats) => {
              if (!stats.hasErrors()) {
                resolve(compiler);
              }
            });
						this.hotClientServer = new HotClientServer(compiler, configs);
          }),
        vendorDLLsFailed,
      )
      // Then start the node development server(s).
      .then((clientCompiler) => {
        this.hotNodeServers = nodeBundles.map(
          ({ name, createCompiler }) =>
            // $FlowFixMe
            new HotNodeServer(name, createCompiler(), clientCompiler, configs),
        );
      });
  }

  dispose() {
    const safeDisposer = (server: any) => (server ? server.dispose() : Promise.resolve());

    // First the hot client server.
    return (
      safeDisposer(this.hotClientServer)
        // Then dispose the hot node server(s).
        .then(() => Promise.all(this.hotNodeServers.map(safeDisposer)))
    );
  }
}

export default HotDevelopment;
