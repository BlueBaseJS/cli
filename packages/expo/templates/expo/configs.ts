// tslint:disable: object-literal-sort-keys
import { VERSION, VERSION_NUMBER } from '../../src/version';

import deepmerge from 'deepmerge';

/**
 * Add any modifications to the platform specific configs here.
 */
export default (input: any) =>
	deepmerge(input, {
		manifest: {
			name: '<%= PROJECT_NAME %>',
			description: '<%= PROJECT_DESCRIPTION %>',
			slug: '<%= SLUG %>',
			owner: '<%= OWNER %>',
			privacy: 'unlisted',
			version: VERSION,
			android: {
				package: 'com.<%= NAMESPACE %>.android',
				versionCode: VERSION_NUMBER,
			},
			ios: {
				buildNumber: VERSION,
				bundleIdentifier: 'com.<%= NAMESPACE %>.ios',
				supportsTablet: true,
			},
		},
	});
