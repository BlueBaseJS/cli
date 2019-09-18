"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const path_1 = __importDefault(require("path"));
const fromHere = (filename) => path_1.default.resolve(__dirname, filename);
exports.getDefaults = (configDir) => {
    const defaults = {
        // /** Babel Configs */
        // babel: {
        // defaultPath: fromHere('emptyHook'),
        // dir: configDir,
        // 	findInBlueBase: true,
        // 	findInPlugins: true,
        // 	isDir: false,
        // 	isHook: true,
        // 	name: '^babel.(js|ts)$',
        // 	slug: 'babel',
        // },
        /** BlueBase bluebase options */
        bluebase: {
            defaultPath: utils_1.fromCore('templates/common/bluebase'),
            dir: configDir,
            findInBlueBase: true,
            findInPlugins: false,
            isDir: false,
            isHook: false,
            name: '^bluebase.(js|ts)$',
            slug: 'bluebase',
        },
        /** Plaform specific configs */
        configs: {
            defaultPath: fromHere('emptyHook'),
            dir: configDir,
            findInBlueBase: true,
            findInPlugins: true,
            isDir: false,
            isHook: true,
            name: '^configs.(js|ts)$',
            slug: 'configs',
        },
        /** Public directory which has all the assets */
        assetsDir: {
            defaultPath: fromHere('assets'),
            dir: configDir,
            findInBlueBase: true,
            findInPlugins: false,
            isDir: true,
            isHook: false,
            name: 'assets',
            slug: 'assets-dir',
        },
        // /** Typescript config settings */
        // tsconfig: {
        // defaultPath: fromHere('tsconfig'),
        // dir: configDir
        // 	findInBlueBase: true,
        // 	findInPlugins: true,
        // 	isDir: false,
        // 	isHook: true,
        // 	name: '^babel.(js|ts)$',
        // 	slug: 'babel',
        // },
        /** Webpack configs */
        webpack: {
            defaultPath: fromHere('emptyHook'),
            dir: configDir,
            findInBlueBase: true,
            findInPlugins: true,
            isDir: false,
            isHook: true,
            name: '^webpack.config.(js|ts)$',
            slug: 'webpack',
        },
    };
    return defaults;
};
//# sourceMappingURL=getDefaults.js.map