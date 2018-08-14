import { ConfigsBundle } from '.';
import { Utils } from '@blueeast/bluerain-cli-core';
import fs from 'fs';
import md5 from 'md5';
import webpack from 'webpack';

// tslint:disable-next-line:no-var-requires
const isInstalled = require('is-installed');

const logger = Utils.logger;

async function createVendorDLL(bundleName: string, bundleConfig: any, configs: ConfigsBundle) {

	///////////////////////////
	//////// Variables ////////
	///////////////////////////

	// Get configuration
	const dllConfig = configs.bundles.client.devVendorDLL;

	if (!dllConfig) {
		const error = 'Vendor DLL configs missing.';
		logger.log({
			label: 'Vendor DLL',
			level: 'error',
			message: error,
		});
		throw Error(error);
	}

	// Package.json
	const pkg = require(Utils.fromProjectRoot('./package.json'));

	// Get list of dependencies to add to dll
	const devDLLDependencies = dllConfig.include.sort();

  // We calculate a hash of the package.json's dependencies, which we can use
  // to determine if dependencies have changed since the last time we built
  // the vendor dll.
	const currentDependenciesHash = md5(
    JSON.stringify(
      devDLLDependencies.map((dep: string) => [dep, pkg.dependencies[dep], pkg.devDependencies[dep]]),
      // We do this to include any possible version numbers we may have for
      // a dependency. If these change then our hash should too, which will
      // result in a new dev dll build.
    ),
	);

	///////////////////////
	//////// Paths ////////
	///////////////////////

	const vendorDLLHashFilePath = `${bundleConfig.outputPath}/${dllConfig.name}_hash`;
	const vendorDLLJsonFilePath = `${bundleConfig.outputPath}/${dllConfig.name}.json`;

	//////////////////////////////////
	//////// Helper functions ////////
	//////////////////////////////////

	// Create webpack configs to generate DLL
	function webpackConfigFactory() {
		if (!dllConfig) {
			const error = 'Vendor DLL configs missing.';
			logger.log({
				label: 'Vendor DLL',
				level: 'error',
				message: error,
			});
			throw Error(error);
		}
		
		return {
      // We only use this for development, so lets always include source maps.
			devtool: 'inline-source-map',
			entry: {
				[dllConfig.name]: devDLLDependencies,
			},
			output: {
				filename: `${dllConfig.name}.js`,
				library: dllConfig.name,
				path: bundleConfig.outputPath,
			},
			plugins: [
				new webpack.DllPlugin({
					name: dllConfig.name,
					path: vendorDLLJsonFilePath,
				}),
			],
		};
	}

	// Build DLL through webpack
	async function buildVendorDLL() {

		const missing = await isMissing(devDLLDependencies);

		if (missing) {
			const err = `${missing} is not installed, could not generate Vendor DLL.`;
			logger.log({
				label: 'Vendor DLL',
				level: 'error',
				message: err,
			});
			throw new Error(err);
		}
		return new Promise((resolve, reject) => {
			logger.log({
				label: 'Vendor DLL',
				level: 'info',
				message: `Vendor DLL build complete. The following dependencies have been included:\n\t- ${devDLLDependencies.join(
					'\n\t- ',
				)}\n`,
			});

			const webpackConfig: any = webpackConfigFactory();
			const vendorDLLCompiler = webpack(webpackConfig);
			vendorDLLCompiler.run((err: Error) => {
				if (err) {
					reject(err);
					return;
				}

				// Update the dependency hash
				fs.writeFileSync(vendorDLLHashFilePath, currentDependenciesHash);

				resolve();
			});
		});
	}

	// If a dependency is missing, return its name
	async function isMissing(dependencies: string[]) {
		for(const dep of dependencies) {
			const installed = await isInstalled(dep);

			if (!installed) {
				return dep;
			}
		}

		return null;
	}

	//////////////////////////////
	//////// Actual logic ////////
	//////////////////////////////

	if (!fs.existsSync(vendorDLLHashFilePath)) {
		// builddll
		logger.log({
			label: 'Vendor DLL',
			level: 'warn',
			// tslint:disable-next-line:max-line-length
			message: `Generating a new "${bundleName}" Vendor DLL for boosted development performance. The Vendor DLL helps to speed up your development workflow by reducing Webpack build times.  It does this by seperating Vendor DLLs from your primary bundles, thereby allowing Webpack to ignore them when having to rebuild your code for changes.  We recommend that you add all your client bundle specific dependencies to the Vendor DLL configuration (within /config).`,
		});

		await buildVendorDLL();
		return;

	} else {
		// first check if the md5 hashes match
		const dependenciesHash = fs.readFileSync(vendorDLLHashFilePath, 'utf8');
		const dependenciesChanged = dependenciesHash !== currentDependenciesHash;

		if (dependenciesChanged) {
			logger.log({
				label: 'Vendor DLL',
				level: 'warn',
				message: `New "${bundleName}" vendor dependencies detected. Regenerating the vendor dll...`,
			});

			await buildVendorDLL();
			return;

		} else {
			logger.log({
				label: 'Vendor DLL',
				level: 'info',
				message: `No changes to existing "${bundleName}" vendor dependencies. Using the existing vendor dll.`,
			});

			return;
		}
	}
}

export default createVendorDLL;
