import path from 'path';
import fs from 'fs';
import shell from 'shelljs';
import Create from './create_file';
import config from '../../config/';
import bluerainJS from './get_bluerain';

// const shell = require('shelljs');

export default function createBootJS(filename) {
  let $content = '';
  const bluerainJsPath = bluerainJS()[0] === 'default' ? config('defaultBluerainJsPathForExpo') : config('customBluerainJsPathForExpo');
  function $createBootJsContent() {
    $content = `
        import BR from '@blueeast/bluerain-os';
        import bootConfig from '${bluerainJsPath}';
        bootConfig.renderApp = false;
        export default BR.boot(bootConfig);
    `;
  }

  function $generate() {
    // create content for App.js.
    $createBootJsContent();
    // Create App.js with above content.
    if (!fs.existsSync(path.join(config('appRootDir'), 'expo'))) {
      shell.mkdir('-p', 'expo');
    }
    
    Create(path.join(config('appRootDir'), 'expo', filename), 'js', $content.replace(/^\s+/gm, ''));
  }

  return {
    generate: $generate,
  };
}
