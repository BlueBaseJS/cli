import path from 'path';
import fs from 'fs';
import config from '../../../config';
import { log } from '../../../internal/utils';

// Check whether bluerain.js file exists inside the bluerain.
// Return the default bluerain.js file if it's missing.
export default function () {
  const customFilePath = path.resolve(config('bluerainDir'), config('bluerainJsFile'));

  if (fs.existsSync(customFilePath)) {
    log({
      title: 'BlueRain Server',
      level: 'info',
      message: `Loading custom bluerain.js file from: ${customFilePath}`,
    });

    return customFilePath;
  }

  log({
    title: 'BlueRain Server',
    level: 'info',
    message: 'Loading default bluerain.js file',
  });

  return path.resolve(__dirname, '../../../shared/components/BlueRain/bluerain.js');
}
