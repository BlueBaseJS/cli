#!/usr/bin/env node

const path = require('path');
const execSync = require('child_process').execSync;

// Dependencies
const babel = path.join(__dirname, '..', 'node_modules', '.bin', 'babel-node');
const serverPath = path.join(__dirname, '..', 'internal', 'scripts', 'build');

// Command
const command = [
  babel,
  serverPath,
  '--optimize',
].join(' ');

execSync(command, { stdio: 'inherit', silent: false });
