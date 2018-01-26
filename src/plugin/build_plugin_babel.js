const buildPlugin = require('./../scripts/buildPluginConfig');
/**
 * configure buildPlugin
 * buildDirName : string, default dist
 * lookUpDir: string, default src
 * bundleFileName: string, default build.js
 */
const babelPlugin = buildPlugin({ bundleFileName: 'bundle.js' });
babelPlugin.cleanAndMakeDir();
babelPlugin.executeBabelBuildCommand();
