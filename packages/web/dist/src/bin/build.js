#!/usr/bin/env node
'use strict';

const execSync = require('child_process').execSync;

// Dependencies
const babel = 'node_modules/.bin/babel-node';
const serverPath = 'node_modules/@blueeast/bluerain-cli-web/src/internal/scripts/build';

// Command
const command = [babel, serverPath, '--optimize'].join(' ');

execSync(command, { stdio: 'inherit', silent: false });