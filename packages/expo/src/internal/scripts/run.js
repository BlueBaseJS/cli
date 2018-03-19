// const { spawn } = require('child_process');
// import fs from 'fs';
// import path from 'path';
// const createAppJson = require('../createAppJson');
// const createAppJs = require('./createAppjs');
// const createBoot = require('./createBoot');
import exp from '../module/get_expo_cli';
import { log } from '../utils';
import AppJson from '../module/generate_appjson_content';
log({
  title: 'expo cli',
  level: 'info',
  message: `using expo cli ${exp()}`,
});

AppJson('app.json').generate();
