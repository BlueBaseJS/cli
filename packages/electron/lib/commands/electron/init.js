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
const cli_flags_1 = require("../../cli-flags");
const dependencies_1 = require("../../scripts/dependencies");
const command_1 = require("@oclif/command");
const cli_core_1 = require("@bluebase/cli-core");
const copyTemplateFiles_1 = require("../../scripts/copyTemplateFiles");
class CustomCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const parsed = this.parse(CustomCommand);
            const flags = parsed.flags;
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/electron',
                level: 'info',
                message: '🛠 Initializing a new BlueBase Web project...',
            });
            // Absolute path of build dir
            const configDir = cli_core_1.Utils.fromProjectRoot(flags.configDir);
            // const buildDir = Utils.fromProjectRoot(flags.buildDir);
            const assetsDir = cli_core_1.Utils.fromProjectRoot(flags.assetsDir);
            ///////////////////////////////
            ///// Copy Template Files /////
            ///////////////////////////////
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/electron',
                level: 'info',
                message: '📂 Creating electron configuration directory...',
            });
            yield copyTemplateFiles_1.copyTemplateFiles(assetsDir, configDir);
            ////////////////////////////
            ///// Add dependencies /////
            ////////////////////////////
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/electron',
                level: 'info',
                message: '📦 Installing dependencies...',
            });
            // Install dependencies
            cli_core_1.Utils.installMissing(dependencies_1.requiredDependencies, false);
            cli_core_1.Utils.installMissing(dependencies_1.requiredDevDependencies, true);
            // Finish
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/electron',
                level: 'info',
                message: '✅ Done! BlueBase Electron project initialized.',
            });
            return;
        });
    }
}
CustomCommand.description = 'Initializes a directory with an example project.';
CustomCommand.examples = [
    `$ bluebase electron:init`,
];
CustomCommand.flags = cli_flags_1.FlagDefs;
exports.default = CustomCommand;
//# sourceMappingURL=init.js.map