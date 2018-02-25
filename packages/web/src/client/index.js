import BR from '@blueeast/bluerain-os';
// import bootConfig from 'CONFIG_PATH';
import bootConfig from 'BLUERAIN_BOOT_CONFIG';

BR.boot(bootConfig);
// require('./web/registerServiceWorker');
console.log('BR booted', BR);
