const webpackDevServer = 'node_modules/.bin/webpack-dev-server ';
const { spawn } = require('child_process');
const path = require('path');

const generateBootFile = require('../../../scripts/generateBootFile');
const createManifestJson = require('./createManifestJson');

generateBootFile();
createManifestJson();

spawn(
	webpackDevServer,
	['--inline', '--hot',
		'--history-api-fallback',
		`--content-base ${path.resolve(__dirname, '../../')}`,
		` --config ${path.resolve(__dirname, '../../webpack.config.js')}`],
	{ shell: true, stdio: 'inherit' }
);
