"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_web_1 = require("@bluebase/cli-web");
exports.default = (webpackConfigInput = {}, buildOptions) => __awaiter(this, void 0, void 0, function* () {
    const builder = new cli_web_1.WebpackTools.WebpackBuilder(buildOptions, webpackConfigInput);
    const configs = builder
        // // Base Config
        .use(cli_web_1.WebpackTools.BaseConfig())
        // // Manually set target to electron
        // .merge({
        // 	// devServer: {
        // 	// 	contentBase: Utils.fromProjectRoot('build/electron'),
        // 	// 	stats: {
        // 	// 		colors: true,
        // 	// 		chunks: false,
        // 	// 		children: false
        // 	// 	},
        // 	// 	before() {
        // 	// 		spawn(
        // 	// 			'electron',
        // 	// 			['./build/electron/main.js'],
        // 	// 			{ shell: true, env: process.env, stdio: 'inherit' }
        // 	// 		)
        // 	// 			.on('close', (_code: number) => process.exit(0))
        // 	// 			.on('error', (spawnError: Error) => console.error(spawnError))
        // 	// 	}
        // 	// }
        // } as any)
        // .use(WebpackTools.NodeExternals({
        // 	modulesDir: fromRoot('./node_modules'),
        // }))
        // // Hot Module Replacement
        // .use(WebpackTools.HotModuleReplacement)
        // Source Maps
        .use(cli_web_1.WebpackTools.SourceMaps())
        // Patch React Native
        .use(cli_web_1.WebpackTools.ReactNative())
        // // Add Jarvis Dashboard
        // .use(WebpackTools.Jarvis)
        .use(cli_web_1.WebpackTools.ClientHTML())
        // .use(WebpackTools.CleanBuildDir)
        // .use(WebpackTools.CopyAssets)
        ///// Loaders
        // CSS Loader
        .use(cli_web_1.WebpackTools.LoaderCss())
        // TS Loader
        .use(cli_web_1.WebpackTools.LoaderTypescript())
        // JS Loader
        // .use(WebpackTools.LoaderJavascript)
        // Finally, merge user input overrides
        .merge(webpackConfigInput)
        // Build
        .build();
    return configs;
});
//# sourceMappingURL=webpack.config.renderer.js.map