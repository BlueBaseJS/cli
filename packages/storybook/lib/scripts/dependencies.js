"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_core_1 = require("@bluebase/cli-core");
/**
 * List of dependencies required by this plugin
 */
exports.requiredDependencies = [
    ...cli_core_1.requiredDependencies,
    'deepmerge',
];
/**
 * List of dev dependencies required by this plugin
 */
exports.requiredDevDependencies = [
    ...cli_core_1.requiredDevDependencies,
    '@bluebase/cli-essentials',
    '@bluebase/storybook-addon',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-info',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/react',
    '@types/deepmerge',
    '@types/storybook__addon-actions',
    '@types/storybook__addon-info',
    '@types/storybook__addon-knobs',
    // 'babel-core@^6.26.3',
    'babel-loader@^8.0.4',
];
//# sourceMappingURL=dependencies.js.map