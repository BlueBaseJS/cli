import * as Commands from './commands';
import * as Core from '@blueeast/bluerain-cli-core';
import { ConfigFiles } from './configFiles';

// export const platformHook = (platform: any) => ({ ...platform, web: DefaultPlatformConfigs });

export class WebEngine extends Core.Engine {

	name = 'Web';
	slug = 'web';

	commands = {
		run: Commands.run
	};

	configFiles = ConfigFiles;
}
