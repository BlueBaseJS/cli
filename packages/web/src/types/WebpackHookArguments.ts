import { ClientConfigs, ServerConfigs } from './configs';
import { BuilderOptions } from './webpack';

export interface WebpackHookArguments extends BuilderOptions {
	clientConfigs?: ClientConfigs,
	serverConfigs?: ServerConfigs,
	clientConfigPath: string,
	serverConfigPath: string,
	static: boolean,
}
