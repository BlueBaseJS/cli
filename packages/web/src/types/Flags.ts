import { ClientConfigs, ServerConfigs } from './configs';

import { Configuration as WebpackConfiguration } from 'webpack';

export interface Flags {
	/** Path of the directory that the output be generated in */
	buildDir: string;

	/** Path of the directory that has configuration files (including bluebase.js) */
	configDir: string;

	/** Path of the direcotry that has all the public assets */
	assetsDir: string;

	/** Should compile a static web project */
	static: boolean;
}

/**
 * Paths of all relevant files
 */
export interface PathsBundle extends Flags {
	/** Path of the App.js file */
	appJsPath: string;

	/** Path of the bluebase.js file */
	bluebaseJsPath: string;

	/** Path of Client configurations */
	clientConfigPath: string;

	/** Path of Client webpack configurations */
	clientWebpackConfigPath: string;

	/** Path of Server configurations */
	serverConfigPath: string;

	/** Path of Server webpack configurations */
	serverWebpackConfigPath: string;
}

/**
 * Paths of all relevant files
 */
export interface ConfigsBundle extends PathsBundle {
	clientConfigs: ClientConfigs;
	serverConfigs: ServerConfigs;
	clientWebpackConfigs: WebpackConfiguration;
	serverWebpackConfigs: WebpackConfiguration;
}
