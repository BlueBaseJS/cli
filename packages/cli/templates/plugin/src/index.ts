import { VERSION } from './version';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	description: '<%= PROJECT_DESCRIPTION %>',
	key: '<%= PROJECT_NAME %>',
	name: '<%= PROJECT_TITLE %>',
	version: VERSION,
});
