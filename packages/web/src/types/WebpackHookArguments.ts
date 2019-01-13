import { ClientConfigs, ServerConfigs } from './configs';
import { BuilderOptions } from './webpack';

export interface WebpackHookArguments extends BuilderOptions {
	clientConfigs?: ClientConfigs,
	serverConfigs?: ServerConfigs,
	static: boolean,
}
