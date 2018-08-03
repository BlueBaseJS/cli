import path from 'path';
import Create from './create_file';
import config from '../../config/';
export default function createAppJS(filename) {
  let $content = '';

  function $createAppJsContent() {
    $content = `
    import App from '${config('bootPath')}';
    export default App;
    `;
  }

  function $generate() {
    // create content for App.js.
    $createAppJsContent();
    // Create App.js with above content.
    Create(path.join(config('appRootDir'), filename), 'js', $content.replace(/^\s+/gm, ''));
  }

  return {
    generate: $generate,
  };
}
