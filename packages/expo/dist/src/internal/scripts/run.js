'use strict';

var _get_expo_cli = require('../module/get_expo_cli');

var _get_expo_cli2 = _interopRequireDefault(_get_expo_cli);

var _utils = require('../utils');

var _generate_appjson_content = require('../module/generate_appjson_content');

var _generate_appjson_content2 = _interopRequireDefault(_generate_appjson_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _utils.log)({
  title: 'expo cli',
  level: 'info',
  message: `using expo cli ${(0, _get_expo_cli2.default)()}`
}); // const { spawn } = require('child_process');
// import fs from 'fs';
// import path from 'path';
// const createAppJson = require('../createAppJson');
// const createAppJs = require('./createAppjs');
// const createBoot = require('./createBoot');


(0, _generate_appjson_content2.default)('app.json').generate();