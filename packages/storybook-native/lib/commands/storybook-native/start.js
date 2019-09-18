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
const flags_1 = require("../../flags");
const child_process_1 = require("child_process");
const command_1 = require("@oclif/command");
const cli_core_1 = require("@bluebase/cli-core");
const cli_expo_1 = require("@bluebase/cli-expo");
const fromRoot_1 = __importDefault(require("../../scripts/fromRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class StartCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const parsed = this.parse(StartCommand);
            const flags = parsed.flags;
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/storybook-native',
                level: 'info',
                message: '🏗 Building project...',
            });
            // Absolute path of build dir
            const buildDir = cli_core_1.Utils.fromProjectRoot(flags.buildDir);
            const configDir = cli_core_1.Utils.fromProjectRoot(flags.configDir);
            const assetsDir = cli_core_1.Utils.fromProjectRoot(flags.assetsDir);
            const appJsPath = cli_core_1.Utils.fromProjectRoot(flags.appJsPath);
            /////////////////////////////
            ///// Transpile & Build /////
            /////////////////////////////
            // const transiplePath = path.join(buildDir, 'dist');
            yield cli_expo_1.createBundle({
                appJsPath,
                assetsDir,
                buildDir,
                configDir,
                name: 'storybook-native',
            });
            let STORYBOOK_APP_PATH = path_1.default.relative(buildDir, path_1.default.join(configDir, 'storybook/'));
            // change STORYBOOK_APP_PATH to defined path is App.js exists in that path
            if (fs_1.default.existsSync(appJsPath + '.js')) {
                STORYBOOK_APP_PATH = path_1.default.relative(buildDir, appJsPath);
            }
            cli_core_1.Utils.copyTemplateFiles(fromRoot_1.default('./templates/build'), buildDir, {
                force: true,
                prompt: false,
                variables: {
                    STORYBOOK_APP_PATH
                },
                writeFiles: ['AppEntry.js'],
            });
            ///////////////////////
            ///// Launch expo /////
            ///////////////////////
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/storybook-native',
                level: 'info',
                message: '🚀 Launching Storybook Native',
            });
            const appJsonPath = path_1.default.join(buildDir, 'app.json');
            child_process_1.execSync(cli_core_1.Utils.fromProjectRoot('./node_modules/.bin/rnstl'));
            const expoProcess = yield child_process_1.spawn(fromRoot_1.default('./node_modules/.bin/expo'), ['start', '--config', cli_core_1.Utils.fromProjectRoot(appJsonPath)], { shell: true, env: process.env, cwd: cli_core_1.Utils.fromProjectRoot(), stdio: 'inherit' });
            process.on('SIGINT', () => {
                cli_core_1.Utils.logger.log({
                    label: '@bluebase/cli/storybook-native',
                    level: 'info',
                    message: '💀 Caught interrupt signal, exiting!',
                });
                if (expoProcess && expoProcess.kill) {
                    expoProcess.kill();
                }
                process.exit();
            });
        });
    }
}
StartCommand.description = 'Starts or restarts a local server for your app and gives you a URL to it.';
StartCommand.examples = [
    `$ bluebase storybook-native:start`,
];
StartCommand.flags = flags_1.ExpoFlagDefs;
exports.default = StartCommand;
//# sourceMappingURL=start.js.map