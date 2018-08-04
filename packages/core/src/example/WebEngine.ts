import { Engine } from "../models";
import { run } from './commands';
import { boot, webpack, publicDir, babel, platform } from "../defaults/ConfigFiles";

export default class WebEngine extends Engine {

	public name = 'Web';

	public slug = 'web';

	public commands = {
		run
	};

	public configFiles = [babel, boot, platform, publicDir, webpack];
}
