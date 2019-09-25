"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_core_1 = require("@bluebase/cli-core");
/**
 * List of dependencies required by this plugin
 */
exports.requiredDependencies = [
    ...cli_core_1.requiredDependencies,
    'deepmerge',
    'react-dom'
];
/**
 * List of dev dependencies required by this plugin
 */
exports.requiredDevDependencies = [
    ...cli_core_1.requiredDevDependencies,
    '@types/deepmerge',
    'react-hot-loader',
    'webpack-hot-client',
];
//# sourceMappingURL=dependencies.js.map