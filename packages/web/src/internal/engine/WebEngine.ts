import { Engine } from '@blueeast/bluerain-cli-core';
import { ConfigFiles } from '../configFiles';

export class WebEngine extends Engine {
	name = 'Web';
	slug = 'web';
	configFiles = ConfigFiles;
}
