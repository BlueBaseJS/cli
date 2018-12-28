import { BlueBase, BlueBaseConsumer } from '@bluebase/core';
import React from 'react';

const DummyComponent = () => (
	<BlueBaseConsumer>
		{(BR: BlueBase) => (<BR.Components.Text>I'm a dummy! 🤪 😎 👍 💯</BR.Components.Text>)}
	</BlueBaseConsumer>
);

export default DummyComponent;