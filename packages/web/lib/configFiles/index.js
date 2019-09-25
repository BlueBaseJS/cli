"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _cliCore = require("@bluebase/cli-core");

var _path = _interopRequireDefault(require("path"));

// import fromRoot from '../helpers/fromRoot';
const fromHere = file => {
  return _path.default.resolve(__dirname, file);
};

var _default = configDir => {
  const defaults = (0, _cliCore.getDefaults)(configDir);
  return [(0, _objectSpread2.default)({}, defaults.configs, {
    defaultPath: fromHere('client.config'),
    name: '^client.config.(js|ts)$',
    slug: 'client-config'
  }), (0, _objectSpread2.default)({}, defaults.configs, {
    defaultPath: fromHere('server.config'),
    name: '^server.config.(js|ts)$',
    slug: 'server-config'
  }), (0, _objectSpread2.default)({}, defaults.webpack, {
    defaultPath: fromHere('./webpack.config.client'),
    name: '^webpack.config.client.(js|ts)$',
    slug: 'client-webpack-config'
  }), (0, _objectSpread2.default)({}, defaults.webpack, {
    defaultPath: fromHere('./webpack.config.server'),
    name: '^webpack.config.server.(js|ts)$',
    slug: 'server-webpack-config'
  }), // {
  // 	...defaults.assetsDir,
  // 	defaultPath: fromRoot('templates/web/assets'),
  // },
  defaults.bluebase];
};

exports.default = _default;