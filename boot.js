import BR from '@blueeast/bluerain-os';
import bootConfig from '../../bluerain.js';

BR.boot(bootConfig);

//require('./web/registerServiceWorker');

console.log('BR booted', BR);
