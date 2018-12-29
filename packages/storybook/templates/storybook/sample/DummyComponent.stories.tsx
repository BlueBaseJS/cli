declare var module: any;

import { BlueBase, BlueBaseConsumer } from '@bluebase/core';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('BlueBase', module)
	.add('DummyComponent', () => (
		<BlueBaseConsumer>
			{(BR: BlueBase) => <BR.Components.DummyComponent />}
		</BlueBaseConsumer>
	));