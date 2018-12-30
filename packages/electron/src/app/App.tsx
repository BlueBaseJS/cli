import * as React from 'react';
import { BlueBaseApp } from '@bluebase/core';
// import ReactHotLoaderPlugin from './ReactHotLoaderPlugin/HOC';

// tslint:disable-next-line:no-var-requires
let bootConfig = require('BLUERAIN_BOOT_OPTIONS');

// ES Module
bootConfig = bootConfig.default ? bootConfig.default : bootConfig;

// const isDev = process.env.BUILD_FLAG_IS_DEV === 'true';
// const isClient = process.env.BUILD_FLAG_IS_CLIENT === 'true';
// const isSSR = process.env.BUILD_FLAG_IS_SSR === 'true';

// if (isDev && isClient) {
// 	bootConfig.plugins = bootConfig.plugins || [];
// 	bootConfig.plugins.push(ReactHotLoaderPlugin);
// }


const App = () => (
	<BlueBaseApp {...bootConfig} />
);

export default App;