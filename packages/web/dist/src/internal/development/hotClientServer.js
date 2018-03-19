'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _listenerManager = require('./listenerManager');

var _listenerManager2 = _interopRequireDefault(_listenerManager);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HotClientServer {
  constructor(compiler) {
    const app = (0, _express2.default)();

    const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    const httpPath = compiler.options.output.publicPath;
    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
      throw new Error('You must supply an absolute public path to a development build of a web target bundle as it will be hosted on a seperate development server to any node target bundles.');
    }

    // eslint-disable-next-line no-unused-vars
    const [_, host, port] = httpPathRegex.exec(httpPath);

    this.webpackDevMiddleware = (0, _webpackDevMiddleware2.default)(compiler, {
      quiet: true,
      noInfo: true,
      headers: {
        'Access-Control-Allow-Origin': `http://${(0, _config2.default)('host')}:${(0, _config2.default)('port')}`
      },
      // Ensure that the public path is taken from the compiler webpack config
      // as it will have been created as an absolute path to avoid conflicts
      // with an node servers.
      publicPath: compiler.options.output.publicPath
    });

    app.use(this.webpackDevMiddleware);
    app.use((0, _webpackHotMiddleware2.default)(compiler));

    const listener = app.listen(port);

    this.listenerManager = new _listenerManager2.default(listener, 'client');

    compiler.plugin('compile', () => {
      (0, _utils.log)({
        title: 'client',
        level: 'info',
        message: 'Building new bundle...'
      });
    });

    compiler.plugin('done', stats => {
      if (stats.hasErrors()) {
        (0, _utils.log)({
          title: 'client',
          level: 'error',
          message: 'Build failed, please check the console for more information.',
          notify: true
        });
        console.error(stats.toString());
      } else {
        (0, _utils.log)({
          title: 'client',
          level: 'info',
          message: 'Running with latest changes.',
          notify: true
        });
      }
    });
  }

  dispose() {
    this.webpackDevMiddleware.close();

    return this.listenerManager ? this.listenerManager.dispose() : Promise.resolve();
  }
}

exports.default = HotClientServer;