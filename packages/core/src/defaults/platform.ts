export interface WebPlatformConfigs {
	mode?: 'development' | 'production' | 'none';
}

export interface PlatformConfigs {

	// web: {},
	// expo: {},
	// electron: {},
	// storybook: {},

	[key: string]: any;
}

export default () => ({ web: { foo: 'bar' } });
