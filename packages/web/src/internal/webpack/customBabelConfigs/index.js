import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';
import config from '../../../config';
import { log } from '../../../internal/utils';

export default function customBabelConfigs(babelConfig, buildOptions) {
  let customBabelConfig;
  const babelConfigPath = path.resolve(config('bluerainDir'), '.babelrc');

  if (fs.existsSync(babelConfigPath)) {
    const content = fs.readFileSync(babelConfigPath, 'utf-8');
    try {
      customBabelConfig = JSON5.parse(content);
      customBabelConfig.babelrc = false;
      log({
        title: 'Babel',
        level: 'info',
        message: 'Loading custom .babelrc',
      });
    } catch (e) {
      log({
        title: 'Babel',
        level: 'error',
        message: `Error parsing .babelrc file: ${e.message}`,
      });
      throw e;
    }
  }

  if (!customBabelConfig) {
    return config('plugins.babelConfig')(babelConfig, buildOptions);
  }

  return customBabelConfig;
}
