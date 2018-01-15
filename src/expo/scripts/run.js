const { spawn } = require('child_process');
const createAppJson = require('../createAppJson');
const createAppJs = require('./createAppjs');
const createBoot = require('./createBoot');
const exp = 'node_modules/.bin/exp ';

createAppJson();
createAppJs();
createBoot();

// spawn('exp', ['start', path.resolve( __dirname, '../../../')], { shell: true, stdio: 'inherit' });
const execCommand = `${exp} start   `;
spawn(execCommand, { shell: true, stdio: 'inherit' });
