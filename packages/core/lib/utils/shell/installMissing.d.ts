/**
 * Takes a list of dependencies and installs only those that are
 * not already installed.
 *
 * @param dep An array of dependencies to check and install
 * @param dev Is this a dev dependency?
 */
export declare const installMissing: (deps?: string[], dev?: boolean) => void;
