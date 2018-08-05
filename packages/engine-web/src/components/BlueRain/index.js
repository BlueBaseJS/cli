import BR from '@blueeast/bluerain-os';
import bootConfig from 'BLUERAIN_BOOT_OPTIONS';

// Execute the first render of our app.
const app = BR.boot({ ...bootConfig, renderApp: false });

export default app;
