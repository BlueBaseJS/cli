const webpackDevServer = 'node_modules/.bin/webpack-dev-server ';
const { spawn } = require('child_process');
const path = require('path');

const createManifestJson = require('./createManifestJson');

createManifestJson();
spawn(
	webpackDevServer,
	['--inline', '--hot',
		'--history-api-fallback',
		`--content-base ${path.resolve(__dirname, 'web')}`,
		` --config ${path.resolve(__dirname, '../../webpack.config.js')}`],
	{ shell: true, stdio: 'inherit' }
);
