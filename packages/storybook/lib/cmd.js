"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
exports.FlagDefs = {
    configDir: command_1.flags.string({
        default: './bluebase/storybook',
        description: 'Path to config directory relative to the root directory',
        env: 'CONFIG_DIR',
        hidden: false,
        multiple: false,
        required: false,
    }),
    buildDir: command_1.flags.string({
        default: './build/storybook',
        description: 'Path to build directory relative to the root directory',
        env: 'BUILD_DIR',
        hidden: false,
        multiple: false,
        required: false,
    }),
    assetsDir: command_1.flags.string({
        default: './assets/storybook',
        description: 'Path to assets directory relative to the root directory',
        env: 'ASSETS_DIR',
        hidden: false,
        multiple: false,
        required: false,
    }),
};
//# sourceMappingURL=cmd.js.map