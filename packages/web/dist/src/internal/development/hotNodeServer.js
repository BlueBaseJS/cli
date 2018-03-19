'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HotNodeServer {
  constructor(name, compiler, clientCompiler) {
    const compiledEntryFile = _path2.default.resolve((0, _config2.default)('projectRootDir'), compiler.options.output.path, `${Object.keys(compiler.options.entry)[0]}.js`);

    const startServer = () => {
      if (this.server) {
        this.server.kill();
        this.server = null;
        (0, _utils.log)({
          title: name,
          level: 'info',
          message: 'Restarting server...'
        });
      }

      const newServer = (0, _child_process.spawn)('node', [compiledEntryFile, '--color']);

      (0, _utils.log)({
        title: name,
        level: 'info',
        message: 'Server running with latest changes.',
        notify: true
      });

      newServer.stdout.on('data', data => console.log(data.toString().trim()));
      newServer.stderr.on('data', data => {
        (0, _utils.log)({
          title: name,
          level: 'error',
          message: 'Error in server execution, check the console for more info.'
        });
        console.error(data.toString().trim());
      });
      this.server = newServer;
    };

    // We want our node server bundles to only start after a successful client
    // build.  This avoids any issues with node server bundles depending on
    // client bundle assets.
    const waitForClientThenStartServer = () => {
      if (this.serverCompiling) {
        // A new server bundle is building, break this loop.
        return;
      }
      if (this.clientCompiling) {
        setTimeout(waitForClientThenStartServer, 50);
      } else {
        startServer();
      }
    };

    clientCompiler.plugin('compile', () => {
      this.clientCompiling = true;
    });

    clientCompiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        this.clientCompiling = false;
      }
    });

    compiler.plugin('compile', () => {
      this.serverCompiling = true;
      (0, _utils.log)({
        title: name,
        level: 'info',
        message: 'Building new bundle...'
      });
    });

    compiler.plugin('done', stats => {
      this.serverCompiling = false;

      if (this.disposing) {
        return;
      }

      try {
        if (stats.hasErrors()) {
          (0, _utils.log)({
            title: name,
            level: 'error',
            message: 'Build failed, check the console for more information.',
            notify: true
          });
          console.log(stats.toString());
          return;
        }

        waitForClientThenStartServer();
      } catch (err) {
        (0, _utils.log)({
          title: name,
          level: 'error',
          message: 'Failed to start, please check the console for more information.',
          notify: true
        });
        console.error(err);
      }
    });

    // Lets start the compiler.
    this.watcher = compiler.watch(null, () => undefined);
  }

  dispose() {
    this.disposing = true;

    const stopWatcher = new Promise(resolve => {
      this.watcher.close(resolve);
    });

    return stopWatcher.then(() => {
      if (this.server) this.server.kill();
    });
  }
}

exports.default = HotNodeServer;