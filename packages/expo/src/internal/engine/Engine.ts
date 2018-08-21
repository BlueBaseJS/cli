import { ConfigFiles } from '../configFiles';
import { Engine } from '@blueeast/bluerain-cli-core';

export class ElectronEngine extends Engine {
	name = 'Expo';
	slug = 'expo';
	configFiles = ConfigFiles;
}
