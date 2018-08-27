import webpack from 'webpack';

export interface HotDevelopmentOptions {
	assetsDirPath: string;
	bluerainJsPath: string;
	buildDirPath: string;
	configDirPath: string;

	serverCompiler: webpack.Compiler,
	serverConfigs: webpack.Configuration,

	clientCompiler: webpack.Compiler,
	clientConfigs: webpack.Configuration,

	[key: string]: any;
}