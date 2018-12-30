import deepmerge from 'deepmerge';
import { BootOptions } from '@bluebase/core';
import commonBootOptions from '../common/bluebase';

// TODO: Only for evaluation, remove this
import DummyPlugin from './sample';

const assetsPath = `../../assets/storybook-native`;

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
			source: require(`${assetsPath}/wallpaper.jpg`),
			resizeMode: 'cover',
		},
	}
};

export default deepmerge(commonBootOptions, bootOptions);
