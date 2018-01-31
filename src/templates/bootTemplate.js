import BR from '@blueeast/bluerain-os';
import bootConfig from 'CONFIG_PATH';
BR.boot(bootConfig);
// require('./web/registerServiceWorker');
console.log('BR booted', BR);
