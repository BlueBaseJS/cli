#!/usr/bin/env node

const path = require('path');
const execSync = require('child_process').execSync;

// Dependencies
const crossEnv = path.join(__dirname, '..', 'node_modules', '.bin', 'cross-env');
const babel = path.join(__dirname, '..', 'node_modules', '.bin', 'babel-node');
const serverPath = path.join(__dirname, '..', 'internal', 'development');

// Command
const command = [
  crossEnv,
  'DEPLOYMENT=development',
  babel,
  serverPath,
].join(' ');

// process.env.DEPLOYMENT = 'development';

execSync(command, { stdio: 'inherit', silent: false });
