import { spawn } from 'child_process';
import exp from '../module/get_expo_cli';
import { log } from '../utils';
import AppJson from '../module/generate_appjson';
import AppJS from '../module/generate_app';
import BootJS from '../module/generate_boot';

log({
  title: 'expo cli',
  level: 'info',
  message: `using expo cli ${exp()}`,
});

AppJson('app.json').generate();
log({
  title: 'App.json',
  level: 'warn',
  message: 'Successfully generated app.json',
});

AppJS('App.js').generate();
log({
  title: 'App.js',
  level: 'warn',
  message: 'Successfully generated App.js',
});

BootJS('boot.js').generate();
log({
  title: 'boot.js',
  level: 'warn',
  message: 'Successfully generated boot.js',
});

const platform = process.argv.includes('android') ? 'build:android' : 'build:ios';

const execCommand = `${exp()} ${platform} `;
spawn(execCommand, {
  shell: true,
  stdio: 'inherit',
});
