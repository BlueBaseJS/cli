import { BootOptions } from '@blueeast/bluerain-os';
import commonBootOptions from '../common/bluerain';
import deepmerge from 'deepmerge';

/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions: BootOptions = {

	config: {

		wallpaper: {
			backgroundColor: 'white',
			resizeMode: 'cover',
			source: require('<%= ASSET_DIR_PATH %>/wallpaper.png'),
		},
	}
};

export default deepmerge(commonBootOptions, bootOptions);
