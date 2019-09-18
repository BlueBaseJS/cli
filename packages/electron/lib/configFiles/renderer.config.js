"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_core_1 = require("@bluebase/cli-core");
const deepmerge_1 = __importDefault(require("deepmerge"));
const path_1 = __importDefault(require("path"));
// const EnvVars = Utils.EnvVars;
exports.fromHere = (file) => {
    return path_1.default.resolve(__dirname, file);
};
exports.default = (input, args) => {
    const configs = {
        target: 'electron-renderer',
        mode: cli_core_1.Utils.isProduction() ? 'production' : 'development',
        // devServerHost: EnvVars.string('HOST', '0.0.0.0'),
        // devServerPort: EnvVars.number('PORT', 1337),
        // devDashboardEnable: EnvVars.bool('CLIENT_DEV_DASHBOARD_ENABLE', true),
        // devDashboardPort: EnvVars.number('CLIENT_DEV_DASHBOARD_PORT', 7332),
        // htmlPage: {
        // 	titleTemplate: 'BlueBase - %s',
        // 	defaultTitle: 'BlueBase',
        // 	description:
        // 		'A starter kit giving you the minimum requirements for a production ready universal react application.',
        // },
        // TODO:
        // extensions: [
        // 	'.web.ts', '.ts',
        // 	'.web.tsx', '.tsx',
        // 	'.web.js', '.js',
        // 	'.web.jsx', '.jsx'
        // ],
        extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
        // bundleAssetsFileName: 'assets.json',
        srcEntryFile: exports.fromHere('../app/renderer_process'),
        includePaths: [
            args.configDir,
            cli_core_1.Utils.fromProjectRoot('./src'),
        ],
        outputPath: path_1.default.join(args.buildDir, 'renderer'),
        // publicPath: '/',
        // includeSourceMapsForOptimisedBundle: false,
        nodeExternalsFileTypeWhitelist: [],
    };
    return deepmerge_1.default(input, configs);
};
//# sourceMappingURL=renderer.config.js.map