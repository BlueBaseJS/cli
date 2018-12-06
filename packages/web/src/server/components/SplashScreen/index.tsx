import React from 'react';

const style = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center',
	width: '100%',
};

/**
 * The is the loading screen when the bundle is downloading, while SSR is disabled.
 */
const SplashScreen = () => {
	return <div style={style} >
		<img src="/loading.gif" />
	</div>;
};

export default SplashScreen;
