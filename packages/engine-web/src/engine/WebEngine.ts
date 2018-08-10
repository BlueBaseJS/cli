import * as Core from '@blueeast/bluerain-cli-core';
import { ConfigFiles } from '../internal/configFiles';
import Commands from './commands';

// export const platformHook = (platform: any) => ({ ...platform, web: DefaultPlatformConfigs });

export class WebEngine extends Core.Engine {
	name = 'Web';
	slug = 'web';
	commands = Commands;
	configFiles = ConfigFiles;
}
