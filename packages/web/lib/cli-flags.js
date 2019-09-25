"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlagDefs = void 0;

var _command = require("@oclif/command");

const FlagDefs = {
  configDir: _command.flags.string({
    default: './bluebase/web',
    description: 'Path to config directory relative to the project root directory',
    env: 'CONFIG_DIR',
    hidden: false,
    multiple: false,
    required: false
  }),
  buildDir: _command.flags.string({
    default: './build/web',
    description: 'Path to build directory relative to the project root directory',
    env: 'BUILD_DIR',
    hidden: false,
    multiple: false,
    required: false
  }),
  assetsDir: _command.flags.string({
    default: './assets/web',
    description: 'Path to assets directory relative to the project root directory',
    env: 'ASSETS_DIR',
    hidden: false,
    multiple: false,
    required: false
  }),
  static: _command.flags.boolean({
    default: false,
    description: 'Create a static project.',
    env: 'STATIC',
    hidden: false,
    required: false
  })
};
exports.FlagDefs = FlagDefs;