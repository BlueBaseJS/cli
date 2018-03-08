import fs from 'fs';
import path from 'path';
import deepmerge from 'deepmerge';
import { log } from '../internal/utils';

export default function customConfigs(_config) {

  // So incoming configs are not mutated
  const config = { ..._config };

  const customConfigPath = path.resolve(config.bluerainDir, 'config.js');

  if (!fs.existsSync(customConfigPath)) {
    log({
      title: 'Configs',
      level: 'info',
      message: 'Using default configurations.',
    });
    return config;
  }

  console.log('customConfigPath', customConfigPath)
  const customConfig = require(customConfigPath).default; // eslint-disable-line
  console.log('customConfig', customConfig)

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
