import fs from 'fs';
import path from 'path';
import deepmerge from 'deepmerge';
import { log } from '../internal/utils';

export default function customConfigs(_config) {

  // So incoming configs are not mutated
  const config = { ..._config };

  // Dynamically requiring a module for both node and webpack. 
  const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;
  const customConfigPath = path.resolve(config.bluerainDir, 'config.js');

  if (!fs.existsSync(customConfigPath)) {
    log({
      title: 'Configs',
      level: 'info',
      message: 'Using default configurations.',
    });
    return config;
  }

  const customConfig = requireFunc(customConfigPath).default; // eslint-disable-line

  if (typeof customConfig === 'function') {
    log({
      title: 'Configs',
      level: 'info',
      message: 'Loading custom configurations (full-control mode).',
    });
    return customConfig(config);
  }

  log({
    title: 'Configs',
    level: 'info',
    message: 'Loading custom configurations (extending mode).',
  });

  return deepmerge(config, customConfig);
}
