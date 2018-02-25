const assign = require('babel-runtime/core-js/object/assign').default;
const defaultWebpackConfig = require('./config/defaults/webpack.config');
const WatchMissingNodeModulesPlugin = require('./config/WatchMissingNodeModulesPlugin');
const buildStatic = require('./build-static');
const buildDev = require('./build-dev');

module.exports = assign({}, defaultWebpackConfig, buildStatic, buildDev, {
	WatchMissingNodeModulesPlugin,
	clientPath: require.resolve('../../../dist/client'),
});
