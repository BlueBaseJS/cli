"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _cliCore = require("@bluebase/cli-core");

var _getExpoSdk = require("./scripts/expo/getExpoSdk");

var _path = _interopRequireDefault(require("path"));

// import { Constants } from 'expo';
// tslint:disable-next-line
var _default = (input, paths) => {
  return (0, _objectSpread2.default)({}, input, {
    manifest: {
      android: {
        package: 'com.bluebase.app'
      },
      description: 'This project is really great.',
      entryPoint: _path.default.relative(_cliCore.Utils.fromProjectRoot(), _path.default.join(paths.buildDir, 'AppEntry.js')),
      icon: _path.default.relative(_cliCore.Utils.fromProjectRoot(), _path.default.join(paths.assetsDir, './icon.png')),
      ios: {
        bundleIdentifier: 'com.bluebase.app',
        supportsTablet: true
      },
      name: 'BlueBase',
      orientation: 'portrait',
      // packagerOpts: {
      // 	sourceExts: [
      // 		'ts',
      // 		'tsx'
      // 	],
      // 	transformer: path.join('node_modules', 'react-native-typescript-transformer', 'index.js')
      // },
      platforms: ['ios', 'android', 'web'],
      privacy: 'public',
      sdkVersion: (0, _getExpoSdk.getExpoSdk)(),
      slug: 'bluebase-project-expo',
      splash: {
        backgroundColor: '#ffffff',
        image: _path.default.relative(_cliCore.Utils.fromProjectRoot(), _path.default.join(paths.assetsDir, './splash.png')),
        resizeMode: 'contain'
      },
      version: '1.0.0'
    }
  });
};

exports.default = _default;