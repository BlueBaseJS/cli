import BR from '@blueeast/bluerain-os';
import bootConfig from '/Users/ar/Coding/bluerain-cli-test/bluerain.js';

// BEFORE_BOOT

BR.boot(bootConfig);

// BEFORE_BOOT
// require('./web/registerServiceWorker');

console.log('BR booted', BR);
