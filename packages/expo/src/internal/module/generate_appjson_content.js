import path from 'path';
import Create from './create_file';
import config from '../../config/';
import bluerainJS from './get_bluerain';
export default function createAppJson(filename) {
  let $content = {};
  const $config = config('expo');

  function $createAppJsonContent() {
    const packageJson = require(path.resolve(config('appRootDir'), 'package.json')) || {};
    const {
      devDependencies: {
        expo: devDepExpo = '25.0.0',
      } = {},
      dependencies: {
        expo: sdkVersion = devDepExpo,
      } = {},
      version: packageJsonVersion,
    } = packageJson;

    const {
      name,
      slug,
      version = packageJsonVersion,
    } = $config;

    const { config: bluerainConfig } = require(bluerainJS()).default;

    $content = {
      expo: {
        name,
        slug,
        sdkVersion: sdkVersion.replace(/(\^~)/, ''),
        version,
        description: $config.description,
        loading: $config.loading || bluerainConfig.loading,
      },
    };
  }

  function $generate() {
    $createAppJsonContent();
    console.log($content);
    Create(path.join(config('appRootDir'), filename), 'json', $content);
  }

  return {
    generate: $generate,
  };
}
