import bootConfig from 'CONFIG_PATH';
import BR from 'OS_PATH';
BR.boot(bootConfig);
require('./web/registerServiceWorker');
console.log('BR booted', BR);