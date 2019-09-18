"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_core_1 = require("@bluebase/cli-core");
const cli_web_1 = require("@bluebase/cli-web");
const path_1 = __importDefault(require("path"));
const fromRoot = (pathSegment) => path_1.default.resolve(__dirname, `../../../${pathSegment}`);
// const fromHere = (pathSegment: string) => path.resolve(__dirname, `${pathSegment}`);
exports.default = (webpackConfigInput = {}, buildOptions) => __awaiter(this, void 0, void 0, function* () {
    const builder = new cli_web_1.WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
    const configs = builder
        // // Base Config
        .use(cli_web_1.WebpackTools.BaseConfig())
        // Manually set target to electron
        .merge({
        // mode: buildOptions.configs.mode,
        // entry: fromHere('../app/main_process.js'),
        output: {
            filename: 'main.js',
            path: cli_core_1.Utils.fromProjectRoot('build/electron'),
            publicPath: 'build/',
        },
        target: 'electron-main',
    })
        .use(cli_web_1.WebpackTools.NodeExternals({
        modulesDir: fromRoot('./node_modules'),
    }))
        // Hot Module Replacement
        .use(cli_web_1.WebpackTools.HotModuleReplacement())
        // // Source Maps
        // .use(WebpackTools.SourceMaps)
        // // Patch React Native
        // .use(WebpackTools.ReactNative)
        // // Add Jarvis Dashboard
        // .use(WebpackTools.Jarvis)
        ///// Loaders
        // // CSS Loader
        // .use(WebpackTools.LoaderCss)
        // TS Loader
        .use(cli_web_1.WebpackTools.LoaderTypescript())
        // JS Loader
        // .use(WebpackTools.LoaderJavascript)
        // Finally, merge user input overrides
        .merge(webpackConfigInput)
        // Build
        .build();
    // console.log(webpackConfigInput);
    // console.log(configs);
    return configs;
});
//# sourceMappingURL=webpack.config.main.js.map