import * as webpack from 'webpack';
import { BootOptions } from '@blueeast/bluerain-os';

export type ConfigBundle = {
	config: object;
	webpack: webpack.Configuration;
	babel: object;
	boot: BootOptions;
};
