import BR from '@blueeast/bluerain-os';
import bootConfig from 'BLUERAIN_BOOT_OPTIONS'; // eslint-disable-line
console.log('abdul...............', bootConfig);
// Execute the first render of our app.
const app = BR.boot({ ...bootConfig, renderApp: false });

export default app;
