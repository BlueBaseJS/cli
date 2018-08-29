import deepmerge from 'deepmerge';
import { BootOptions } from '@blueeast/bluerain-os';
import commonBootOptions from '../common/bluerain';

/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions: BootOptions = {

	config: {

		wallpaper: {
			backgroundColor: 'white',
			source: require('./assets/wallpaper.png'),
			resizeMode: 'cover',
		},
	}
};

export default deepmerge(commonBootOptions, bootOptions);
