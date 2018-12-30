declare var module: any;

import { getComponent } from '@bluebase/core';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const DummyComponent = getComponent('DummyComponent');

storiesOf('BlueBase', module)
	.add('DummyComponent', () => (
		<DummyComponent />
	));