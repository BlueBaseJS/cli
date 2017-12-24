import bootConfig from '/home/umair/Projects/Practice/bin-web/bluerain.js';
import BR from '@blueeast/bluerain-os';
BR.boot(bootConfig);
require('./web/registerServiceWorker');
console.log('BR booted', BR);
