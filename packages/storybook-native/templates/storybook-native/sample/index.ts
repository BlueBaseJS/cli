import DummyComponent from './DummyComponent';
import { createPlugin } from '@bluebase/core';

export default createPlugin({

	key: 'dummy-plugin',
	name: 'DummyPlugin',

	components: {
		DummyComponent,
	}
});
