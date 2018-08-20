import { ConfigFiles } from '../configFiles';
import { Engine } from '@blueeast/bluerain-cli-core';

export class ElectronEngine extends Engine {
	name = 'Electron';
	slug = 'electron';
	configFiles = ConfigFiles;
}
