import { BlueBase } from '@bluebase/core';
import Plugin from '../index';

test('Plugin should be correctly registered', async () => {
	const BB = new BlueBase();
	await BB.Plugins.register(Plugin);

	expect(BB.Plugins.has('<%= PROJECT_NAME %>')).toBeTruthy();
});
