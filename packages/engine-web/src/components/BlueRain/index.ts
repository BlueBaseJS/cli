import * as React from 'react';
import BR from '@blueeast/bluerain-os';
// import bootConfig from 'BLUERAIN_BOOT_OPTIONS';
let bootConfig = require('BLUERAIN_BOOT_OPTIONS');

// ES Module
bootConfig = (bootConfig.default ? bootConfig.default : bootConfig);

console.log('bootConfig', bootConfig);
// Execute the first render of our app.
const app: React.ComponentType = BR.boot({ ...bootConfig, renderApp: false });

export default app;
