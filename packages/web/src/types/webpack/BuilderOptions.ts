import { BundleDefinition } from './BundleDefinition';

export interface BuilderConfigsProp extends BundleDefinition {
	[key: string]: any;
}

export type BuilderOptions = {

	/** Path of the directory that has configuration files (including bluebase.js) */
	configDirPath: string,

	/** Path of the directory that the output be generated in */
	buildDirPath: string,

	/** Path of the direcotry that has all the public assets */
	assetsDirPath: string,

	/** Path of the bluebase.js file */
	bluebaseJsPath: string;

	/** Path of the App.js file */
	appJsPath: string;

	/** Platform configs */
	configs: BuilderConfigsProp;
};
