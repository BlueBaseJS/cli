import fs from 'fs';
import path from 'path';
import config from '../../../config';
import { log } from '../../../internal/utils';

export default function customWebpackConfigs(webpackConfig, buildOptions) {
  const customConfigPath = path.resolve(config('bluerainDir'), 'webpack.config.js');

  if (!fs.existsSync(customConfigPath)) {
    log({
      title: 'Webpack',
      level: 'info',
      message: 'Using default webpack setup.',
    });
    return webpackConfig;
  }

  const customConfig = require(customConfigPath);

  if (typeof customConfig === 'function') {
    log({
      title: 'Webpack',
      level: 'info',
      message: 'Loading custom webpack config (full-control mode).',
    });
    return customConfig(webpackConfig, buildOptions);
  }

  log({
    title: 'Webpack',
    level: 'info',
    message: 'Loading custom webpack config (extending mode).',
  });

  return {
    ...customConfig,
    // We'll always load our configurations after the custom config.
    // So, we'll always load the stuff we need.
    ...webpackConfig,
    // Override with custom devtool if provided
    devtool: customConfig.devtool || webpackConfig.devtool,
    // We need to use our and custom plugins.
    plugins: [...webpackConfig.plugins, ...(customConfig.plugins || [])],
    module: {
      ...webpackConfig.module,
      // We need to use our and custom rules.
      ...customConfig.module,
      rules: [
        ...webpackConfig.module.rules,
        ...((customConfig.module && customConfig.module.rules) || []),
      ],
    },
    resolve: {
      ...webpackConfig.resolve,
      ...customConfig.resolve,
      alias: {
        ...webpackConfig.alias,
        ...(customConfig.resolve && customConfig.resolve.alias),
      },
    },
  };
}
