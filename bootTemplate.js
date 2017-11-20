import bootConfig from 'CONFIG_PATH';
import BR from '@blueeast/bluerain-os';
BR.boot(bootConfig);
require('./web/registerServiceWorker');
console.log('BR booted', BR);