export interface PlatformConfigs {

	// web: {},
	// expo: {},
	// electron: {},
	// storybook: {},

	[key: string]: any;
}

export default () => ({ web: { foo: 'bar' } });
