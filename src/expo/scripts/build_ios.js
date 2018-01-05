const { spawn } = require('child_process');
const path = require('path');
const createAppJson = require('../createAppJson');

createAppJson();

spawn('exp', ['build:ios', path.resolve( __dirname, '../../../')], { shell: true, stdio: 'inherit' });
