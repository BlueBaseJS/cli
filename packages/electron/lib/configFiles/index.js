"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_core_1 = require("@bluebase/cli-core");
const path_1 = __importDefault(require("path"));
const fromHere = (file) => {
    return path_1.default.resolve(__dirname, file);
};
exports.default = (configDir) => {
    const defaults = cli_core_1.getDefaults(configDir);
    return [
        Object.assign({}, defaults.configs, { defaultPath: fromHere('main.config'), name: '^main.config.(js|ts)$', slug: 'main-config' }),
        Object.assign({}, defaults.configs, { defaultPath: fromHere('renderer.config'), name: '^renderer.config.(js|ts)$', slug: 'renderer-config' }),
        Object.assign({}, defaults.webpack, { defaultPath: fromHere('./webpack.config.main'), name: '^webpack.config.main.(js|ts)$', slug: 'main-webpack-config' }),
        Object.assign({}, defaults.webpack, { defaultPath: fromHere('./webpack.config.renderer'), name: '^webpack.config.renderer.(js|ts)$', slug: 'renderer-webpack-config' }),
        // {
        // 	...defaults.assetsDir,
        // 	defaultPath: fromRoot('templates/web/assets'),
        // },
        defaults.bluebase,
    ];
};
//# sourceMappingURL=index.js.map