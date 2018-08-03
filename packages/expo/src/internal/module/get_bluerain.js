import path from 'path';
import fs from 'fs';
import config from '../../config';
import { log } from '../utils';

const Bluerain = (function getBlueRainJS() {
  const customBluerainJS = path.resolve(config('bluerainDir'), 'bluerain.js');
  return function whichBlueRainJS() {
    if (fs.existsSync(customBluerainJS)) {
      log({
        title: 'Bluerain',
        level: 'info',
        message: 'Loading custom bluerain',
      });
      return ['custom', customBluerainJS];
    }

    log({
      title: 'Bluerain',
      level: 'info',
      message: 'Loading default bluerain',
    });

    return ['default', path.resolve(__dirname, '../../config/default/bluerain.js')];
  };
}());

export default Bluerain;
