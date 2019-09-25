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
const cmd_1 = require("../../cmd");
const command_1 = require("@oclif/command");
const cli_core_1 = require("@bluebase/cli-core");
const child_process_1 = require("child_process");
class CustomCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const parsed = this.parse(CustomCommand);
            const flags = parsed.flags;
            // Absolute path of build dir
            const configDir = cli_core_1.Utils.fromProjectRoot(flags.configDir);
            /////////////////////////
            ///// Launch Server /////
            /////////////////////////
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/storybook',
                level: 'info',
                message: '🚀 Launching Storybook Server',
            });
            const child = child_process_1.spawn(cli_core_1.Utils.fromProjectRoot('./node_modules/.bin/start-storybook'), ['start', '--config-dir', cli_core_1.Utils.fromProjectRoot(configDir, 'configs'), '-p', '6006'], { shell: true, env: process.env, stdio: 'inherit' })
                .on('close', (_code) => process.exit(0))
                .on('error', (spawnError) => cli_core_1.Utils.logger.error(spawnError));
            process.on('SIGINT', () => {
                cli_core_1.Utils.logger.log({
                    label: '@bluebase/cli/expo',
                    level: 'info',
                    message: '💀 Caught interrupt signal, exiting!',
                });
                child.kill();
                process.exit();
            });
            return;
        });
    }
}
CustomCommand.description = 'Starts or restarts a local server for your app and gives you a URL to it.';
CustomCommand.examples = [
    `$ bluebase storybook:start`,
];
CustomCommand.flags = cmd_1.FlagDefs;
exports.default = CustomCommand;
//# sourceMappingURL=start.js.map