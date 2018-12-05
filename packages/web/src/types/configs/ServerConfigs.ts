import { BundleDefinition } from '../webpack';
import { IHelmetContentSecurityPolicyDirectives } from 'helmet';

export interface ServerConfigs extends BundleDefinition {
	/** The host on which the server should run. */
	host: string,

	/** The port on which the server should run. */
	port: number,

	/*
	 * This is an example environment variable which is used within the react
	 * application to demonstrate the usage of environment variables across
	 * the client and server bundles.
	 */
	welcomeMessage: string,

	/** Disable server side rendering? */
	disableSSR: boolean,

	/*
	 * How long should we set the browser cache for the served assets?
	 * Don't worry, we add hashes to the files, so if they change the new files
	 * will be served to browsers.
	 * We are using the "ms" format to set the length.
	 * @see https://www.npmjs.com/package/ms
	 */
	browserCacheMaxAge: string,

	/*
   * Content Security Policy (CSP)
   * @see server/middleware/security for more info.
	 */
	cspExtensions: IHelmetContentSecurityPolicyDirectives,

	/*
   * Note: you can only have a single service worker instance.  Our service
   * worker implementation is bound to the "client" and "server" bundles.
   * It includes the "client" bundle assets, as well as the public folder assets,
   * and it is served by the "server" bundle.
	 */
	serviceWorker: {

		/** Enabled? */
		enabled: boolean,

		/** Service worker name */
		fileName: string,

		/*
     * Paths to the public assets which should be included within our
     * service worker. Relative to our public folder path, and accepts glob
     * syntax.
		 */
		includePublicAssets: string[],

		/** Offline page file name. */
		offlinePageFileName: string,
	},
}
