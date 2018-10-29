const deepmerge = require('deepmerge');

/**
 * Add any modifications to the platform specific configs here.
 */
export default (input: any) => {
	return deepmerge(input, {

		// app.json is generated from manifest
		manifest: {
			name: 'BlueRain Storybook Native',
			slug: 'bluerain-storybook-native',
		}
	});
}