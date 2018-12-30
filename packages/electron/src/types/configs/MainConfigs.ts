import { BundleDefinition } from '@bluebase/cli-web';

export interface MainConfigs extends BundleDefinition {
	/** The host on which the server should run. */
	host: string,

	/** The port on which the server should run. */
	port: number,

	/** The port on which to serve webpack dashboard on. */
	devDashboardPort: number,

	/** Disable webpack dashboard? */
	devDashboardEnable: boolean,

	/** What is the public http path at which we must serve the bundle from? */
	publicPath: string,

	/*
   * What should we name the json output file that webpack generates
   * containing details of all output files for a bundle?
	 */
	bundleAssetsFileName: string,

	/*
	 * Configuration settings for the development vendor DLL.  This will be created
	 * by our development server and provides an improved dev experience
	 * by decreasing the number of modules that webpack needs to process
	 * for every rebuild of our client bundle.  It by default uses the
	 * dependencies configured in package.json however you can customise
	 * which of these dependencies are excluded, whilst also being able to
	 * specify the inclusion of additional modules below.
	 */
	devVendorDLL?: {
		/** Enabled? */
		enabled: boolean,

		/*
		 * Specify any dependencies that you would like to include in the
		 * Vendor DLL.
		//
		 * NOTE: It is also possible that some modules require specific
		 * webpack loaders in order to be processed (e.g. CSS/SASS etc).
		 * For these cases you don't want to include them in the Vendor DLL.
		 */
		include: string[],

		/** The name of the vendor DLL. */
		name: string,
	},
}
