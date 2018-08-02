import path from 'path';
import fs from 'fs';
import config from '../../../config';
import { log } from '../../../internal/utils';

// Check whether boot.js file exists inside the bluerain.
// Return the default boot.js file if it's missing.
export default function () {
  const customFilePath = path.resolve(config('bluerainDir'), config('bootConfigFile'));
  console.log('bootJs', customFilePath);
  if (fs.existsSync(customFilePath)) {
    log({
      title: 'BlueRain Server',
      level: 'info',
      message: `Loading custom boot.js file from: ${customFilePath}`,
    });

    return customFilePath;
  }

  log({
    title: 'BlueRain Server',
    level: 'info',
    message: 'Loading default boot.js file',
  });

  return path.resolve(__dirname, '../../../shared/components/BlueRain/boot.js');
}
