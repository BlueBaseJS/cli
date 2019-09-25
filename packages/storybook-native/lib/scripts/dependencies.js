"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_expo_1 = require("@bluebase/cli-expo");
/**
 * List of dependencies required by this plugin
 */
exports.requiredDependencies = [
    ...cli_expo_1.requiredDependencies,
];
/**
 * List of dev dependencies required by this plugin
 */
exports.requiredDevDependencies = [
    ...cli_expo_1.requiredDevDependencies,
    '@bluebase/storybook-addon',
    // '@storybook/addon-ondevice-knobs',
    // '@storybook/addon-ondevice-notes',
    '@storybook/react-native',
    'react-native-storybook-loader',
];
//# sourceMappingURL=dependencies.js.map