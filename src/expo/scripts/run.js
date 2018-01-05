const { spawn } = require('child_process');
const path = require('path');
const createAppJson = require('../createAppJson');
const exp = 'node_modules/.bin/exp ';

createAppJson();

const execCommand = `${exp} start --lan --dev  ${path.resolve( __dirname, '../../../')}`;
spawn(execCommand, { shell: true, stdio: 'inherit' });
