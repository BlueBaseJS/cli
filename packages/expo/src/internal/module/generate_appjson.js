import path from 'path';
import Create from './create_file';
import config from '../../config/';
import bluerainJS from './get_bluerain';
export default function createAppJson(filename) {
  let $content = {};
  const $config = config('expo');

  function $createAppJsonContent() {
    // Load package.json
    const packageJson = require(path.resolve(config('appRootDir'), 'package.json')) || {};
    // Get expo version from dependencies if not found
    // use from devDependencies, otherwise default is 25.0.0
    const {
      devDependencies: {
        expo: devDepExpo = '25.0.0',
      } = {},
      dependencies: {
        expo: sdkVersion = devDepExpo,
      } = {},
      version: packageJsonVersion,
    } = packageJson;

    // Default name, slug and version 
    const {
      name,
      slug,
      version = packageJsonVersion,
    } = $config;

    // Get bluerain.js first from targetProjectDir of bluerain if not found
    // load default bluerain.js
    const { config: bluerainConfig } = require(bluerainJS()[1]).default;
    const {
      loading,
      theme: {
        colors: {
          primary: primaryColor,
        } = {},
      } = {},

    } = bluerainConfig;

    // Restructure all the content need to be filled in app.json
    $content = {
      expo: {
        name,
        slug,
        sdkVersion: sdkVersion.replace(/(\^|~)/g, ''),
        version,
        description: $config.description,
        loading: $config.loading || loading,
        primaryColor,
        ...$config,
      },
    };
  }

  function $generate() {
    // create content for app.json.
    $createAppJsonContent();
    // Create app.json with above content.
    Create(path.join(config('appRootDir'), filename), 'json', $content);
  }

  return {
    generate: $generate,
  };
}
