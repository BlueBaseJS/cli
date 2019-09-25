"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_core_1 = require("@bluebase/cli-core");
/**
 * List of dependencies required by this plugin
 */
exports.requiredDependencies = [...cli_core_1.requiredDependencies, 'deepmerge'];
/**
 * List of dev dependencies required by this plugin
 */
exports.requiredDevDependencies = [
    ...cli_core_1.requiredDevDependencies,
    '@bluebase/core',
    '@types/deepmerge',
    'react-native-typescript-transformer@^1.2.10',
    'schedule@0.4.0'
];
//# sourceMappingURL=dependencies.js.map