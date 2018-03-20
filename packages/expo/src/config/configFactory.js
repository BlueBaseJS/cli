/**
 * Project Configuration.
 *
 * NOTE: All file/folder paths should be relative to the project root. The
 * absolute paths should be resolved during runtime by our build internal/server.
 */

import path from 'path';
import appRootDir from 'app-root-dir';
import projectRootDir from './projectRootDir';
import customConfigs from './customConfigs';

const configFactory = configs => customConfigs({
  projectRootDir,

  // Location of root directory of app
  appRootDir: path.resolve(appRootDir.get()),

  // Location of bluerain directory in the project
  bluerainDir: path.resolve(appRootDir.get(), 'bluerain'),

  // path to exp cli
  expoCli: 'node_modules/.bin/exp',

  // bootPath where boot.js live
  bootPath: './expo/boot.js',

  // Path to default bluerain js file
  defaultBluerainJsPathForExpo: '@blueeast/bluerain-cli-expo/src/config/default/bluerain.js',

  // Path to custom bluerain js file
  customBluerainJsPathForExpo: './bluerain/bluerain.js',

  // Expo default conifgurations
  expo: {
    name: 'Bluerain',
    slug: 'bluerain',
  },

  ...configs,

});

// This protects us from accidentally including this configuration in our
// client bundle. That would be a big NO NO to do. :)
if (process.env.BUILD_FLAG_IS_CLIENT === 'true') {
  throw new Error("You shouldn't be importing the `<projectroot>/config/values.js` directly into code that will be included in your 'client' bundle as the configuration object will be sent to user's browsers. This could be a security risk! Instead, use the `config` helper function located at `<projectroot>/config/index.js`.");
}

export default configFactory;
