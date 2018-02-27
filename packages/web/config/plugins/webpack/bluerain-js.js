import path from 'path';
import fs from 'fs';
import config from '../../';
import { log } from '../../../internal/utils';

export default function bluerainFileLoader(webpackConfig) {
  // Check whether bluerain.js file exists inside the bluerain.
  // Load the default bluerain.js file if it's missing.
  // Insert it after polyfills.js, but before client/client.
  const bluerainCustomConfigsPath = path.resolve(config('bluerainDir'), config('bluerainJsFile'));
  if (fs.existsSync(bluerainCustomConfigsPath)) {
    log({
      title: 'BlueRain Server',
      level: 'info',
      message: `Loading custom bluerain.js file from: ${bluerainCustomConfigsPath}`,
    });

    webpackConfig.entry.index.splice(3, 0, bluerainCustomConfigsPath);
    webpackConfig.resolve.alias.BLUERAIN_BOOT_CONFIG = bluerainCustomConfigsPath;
  } else {
    log({
      title: 'BlueRain Server',
      level: 'info',
      message: 'Loading default bluerain.js file',
    });
    const bluerainDefaultConfigsPath = path.resolve(__dirname, '../../../shared/components/BlueRain/bluerain.js');
    webpackConfig.entry.index.splice(3, 0, bluerainDefaultConfigsPath);
    webpackConfig.resolve.alias.BLUERAIN_BOOT_CONFIG = bluerainDefaultConfigsPath;
  }

  return webpackConfig;
}
