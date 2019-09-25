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
const cli_flags_1 = require("../../cli-flags");
const command_1 = require("@oclif/command");
const scripts_1 = require("../../scripts");
const fs_1 = __importDefault(require("fs"));
const configFiles_1 = __importDefault(require("../../configFiles"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const webpack_serve_1 = __importDefault(require("webpack-serve"));
const shelljs_1 = __importDefault(require("shelljs"));
const webpack_1 = __importDefault(require("webpack"));
// tslint:disable-next-line:no-var-requires
const { spawn } = require('child_process');
// tslint:disable-next-line:no-var-requires
const webpackServeWaitpage = require('webpack-serve-waitpage');
// import { webpackCompileDev } from '../../scripts/webpackCompileDev';
// import fromRoot from '../../scripts/fromRoot';
class CustomCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const parsed = this.parse(CustomCommand);
            const flags = parsed.flags;
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/electron',
                level: 'info',
                message: '🌏 Starting BlueBase on electron...',
            });
            // Absolute path of build dir
            const buildDir = cli_core_1.Utils.fromProjectRoot(flags.buildDir);
            const configDir = cli_core_1.Utils.fromProjectRoot(flags.configDir);
            // const appJsPath = Utils.fromProjectRoot(flags.appJsPath);
            // const customWebPackClientConfigPath = Utils.fromProjectRoot(flags.webpackClientConfigPath);
            // const customWebPackServerConfigPath = Utils.fromProjectRoot(flags.webpackServerConfigPath);
            /////////////////////////////
            ///// Setup FileManager /////
            /////////////////////////////
            // Set config files
            const configFiles = configFiles_1.default(flags.configDir);
            const fileManager = new cli_core_1.FileManager('electron', configFiles);
            yield fileManager.setup();
            ///////////////////////////
            ///// Clear build dir /////
            ///////////////////////////
            // Delete dir if already exists
            if (fs_1.default.existsSync(buildDir)) {
                rimraf_1.default.sync(buildDir);
            }
            // Create a new build dir
            shelljs_1.default.mkdir('-p', buildDir);
            ////////////////////////////
            ///// Generate Configs /////
            ////////////////////////////
            const mainConfigs = yield fileManager.Hooks.run(`electron.main-config`, {}, { buildDir, configDir });
            const rendererConfigs = yield fileManager.Hooks.run(`electron.renderer-config`, {}, { buildDir, configDir });
            // Path to bluebase.js file
            const bluebaseJsPath = yield fileManager.resolveFilePath('bluebase');
            // const assetsDirPath = await fileManager.resolveFilePath('assets-dir');
            const assetsDirPath = path_1.default.join(configDir, 'assets');
            const baseWebpackBuildOptions = {
                // appJsPath,
                assetsDirPath,
                bluebaseJsPath,
                buildDirPath: buildDir,
                configDirPath: configDir,
            };
            //////////////////////////
            ///// Main Configs /////
            //////////////////////////
            const mainWebpackConfigs = yield fileManager.Hooks.run(`electron.main-webpack-config`, {}, Object.assign({}, baseWebpackBuildOptions, { configs: Object.assign({}, mainConfigs, { mode: 'development' }), mainConfigs,
                rendererConfigs }));
            const mainCompiler = webpack_1.default(mainWebpackConfigs);
            ////////////////////////////
            ///// Renderer Configs /////
            ////////////////////////////
            const rendererWebpackConfigs = yield fileManager.Hooks.run(`electron.renderer-webpack-config`, {}, Object.assign({}, baseWebpackBuildOptions, { configs: Object.assign({}, rendererConfigs, { mode: 'development' }), mainConfigs,
                rendererConfigs }));
            // const rendererCompiler = webpack(rendererWebpackConfigs);
            /////////////////
            ///// Build /////
            /////////////////
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/electron',
                level: 'info',
                message: `👨‍💻 Compiling Electron's Main bundle`
            });
            mainCompiler.run((err, _stats) => {
                if (err) {
                    throw err;
                }
                cli_core_1.Utils.logger.log({
                    label: '@bluebase/cli/electron',
                    level: 'info',
                    message: `👨‍💻 Compiling Electron's Renderer bundle`
                });
                webpack_serve_1.default({}, {
                    config: rendererWebpackConfigs,
                    // content: Utils.fromProjectRoot('./build/electron'),
                    devMiddleware: {
                        publicPath: '/',
                        writeToDisk: true,
                    },
                    add: (app, _middleware, options) => {
                        // Be sure to pass the options argument from the arguments
                        app.use(webpackServeWaitpage(options, { theme: 'material' }));
                        // Make sure the usage of webpack-serve-waitpage will be before the following commands if exists
                        // middleware.webpack();
                        // middleware.content();
                    },
                    on: {
                        'build-started': () => {
                            // Finish
                            cli_core_1.Utils.logger.log({
                                label: '@bluebase/cli/electron',
                                level: 'info',
                                message: '✅ Done!',
                            });
                            spawn(scripts_1.fromRoot('./node_modules/.bin/electron'), ['./build/electron/main.js'], { shell: true, env: process.env, stdio: 'inherit' })
                                .on('close', (_code) => process.exit(0))
                                .on('error', (spawnError) => cli_core_1.Utils.logger.error(spawnError));
                        },
                    }
                }).then((_result) => {
                    cli_core_1.Utils.logger.log({
                        label: '@bluebase/cli/electron',
                        level: 'info',
                        message: '🚀 Launching!',
                    });
                });
            });
        });
    }
}
CustomCommand.flags = cli_flags_1.FlagDefs;
exports.CustomCommand = CustomCommand;
//# sourceMappingURL=start.js.map