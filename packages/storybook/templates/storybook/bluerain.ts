import { BootOptions } from '@bluebase/core';
import commonBootOptions from '../common/bluebase';
import deepmerge from 'deepmerge';

// TODO: Only for evaluation, remove this
import DummyPlugin from './sample';

/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions: BootOptions = {

	plugins: [
		// TODO: Only for evaluation, remove this
		DummyPlugin
	],
	config: {

		wallpaper: {
			backgroundColor: 'white',
			resizeMode: 'cover',
			source: require('<%= ASSET_DIR_PATH %>/wallpaper.jpg'),
		},
	}
};

export default deepmerge(commonBootOptions, bootOptions);
