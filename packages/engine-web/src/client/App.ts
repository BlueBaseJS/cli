import * as React from 'react';
import BR from '@blueeast/bluerain-os';

// tslint:disable-next-line:no-var-requires
let bootConfig = require('BLUERAIN_BOOT_OPTIONS');
// ES Module
bootConfig = (bootConfig.default ? bootConfig.default : bootConfig);

// Execute the first render of our app.
const app: React.ComponentType = BR.boot({ ...bootConfig, renderApp: false });

export default app;
