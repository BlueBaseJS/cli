import * as React from 'react';
import BR from '@blueeast/bluerain-os';
// import ReactHotLoaderPlugin from './ReactHotLoaderPlugin/HOC';

// const isDev = process.env.BUILD_FLAG_IS_DEV === 'true';
// const isClient = process.env.BUILD_FLAG_IS_CLIENT === 'true';
// const isSSR = process.env.BUILD_FLAG_IS_SSR === 'true';

// tslint:disable-next-line:no-var-requires
let bootConfig = require('BLUERAIN_BOOT_OPTIONS');

// ES Module
bootConfig = (bootConfig.default ? bootConfig.default : bootConfig);

// if (isDev && isClient) {
// 	bootConfig.plugins = bootConfig.plugins || [];
// 	bootConfig.plugins.push(ReactHotLoaderPlugin);
// }

// if (isSSR) {
// 	BR.enableSsrMode();
// }

// Execute the first render of our app.
const App: React.ComponentType = BR.boot({ ...bootConfig, renderApp: false });

export default App;
export { BR };
