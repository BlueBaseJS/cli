#!/usr/bin/env node
const execSync = require('child_process').execSync;

// Dependencies
const crossEnv ='node_modules/.bin/cross-env';
const babel = 'node_modules/.bin/babel-node';
const serverPath = 'node_modules/@blueeast/bluerain-cli-web/src/internal/development';

// Command
const command = [crossEnv, 'DEPLOYMENT=development', babel, serverPath].join(' ');

// process.env.DEPLOYMENT = 'development';

execSync(command, { stdio: 'inherit', silent: false });