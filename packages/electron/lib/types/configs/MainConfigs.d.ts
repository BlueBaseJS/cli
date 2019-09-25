import { BundleDefinition } from '@bluebase/cli-web';
export interface MainConfigs extends BundleDefinition {
    /** The host on which the server should run. */
    host: string;
    /** The port on which the server should run. */
    port: number;
    /** The port on which to serve webpack dashboard on. */
    devDashboardPort: number;
    /** Disable webpack dashboard? */
    devDashboardEnable: boolean;
    /** What is the public http path at which we must serve the bundle from? */
    publicPath: string;
    bundleAssetsFileName: string;
    devVendorDLL?: {
        /** Enabled? */
        enabled: boolean;
        include: string[];
        /** The name of the vendor DLL. */
        name: string;
    };
}
