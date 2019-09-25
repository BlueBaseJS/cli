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
// import { ExpoFlagDefs, ExpoFlags } from '../../flags';
const dependencies_1 = require("../../scripts/dependencies");
const command_1 = require("@oclif/command");
const cli_core_1 = require("@bluebase/cli-core");
// import fromRoot from '../../scripts/fromRoot';
const inquirer_1 = __importDefault(require("inquirer"));
// tslint:disable: no-var-requires
const gitclone = require('gitclone');
const { execSync } = require('child_process');
class ExpoStart extends command_1.Command {
    // static flags = ExpoFlagDefs
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            // const parsed = this.parse(ExpoStart)
            // const flags = parsed.flags as ExpoFlags
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/expo',
                level: 'info',
                message: '🔌 Initializing a new BlueBase Plugin project...',
            });
            const questions = [
                {
                    default: '@bluebase/plugin-untitled',
                    message: 'What is the name of the project? The official naming convention is "@bluebase/plugin-*".',
                    name: 'PROJECT_NAME',
                    type: 'input',
                },
                {
                    default: 'BlueBaseJS',
                    message: 'GitHub user or organization name where the project will be published.',
                    name: 'GIT_ORG',
                    type: 'input',
                },
                {
                    default: 'plugin-untitled',
                    message: 'GitHub repo ID',
                    name: 'GIT_REPO',
                    type: 'input',
                },
                {
                    default: 'Untitled Plugin',
                    message: 'Project title. This will be added to README.md',
                    name: 'PROJECT_TITLE',
                    type: 'input',
                },
                {
                    default: 'A BlueBase plugin boilerplate!',
                    message: 'Project description.',
                    name: 'PROJECT_DESCRIPTION',
                    type: 'input',
                }
            ];
            const prompt = inquirer_1.default.createPromptModule();
            const answers = yield prompt(questions);
            ///////////////////////////////
            ///// Copy Template Files /////
            ///////////////////////////////
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/expo',
                level: 'info',
                message: '📂 Creating Plugin Boilerplate directory...',
            });
            // clones with SSH
            yield new Promise((resolve) => {
                gitclone('BlueBaseJS/plugin-boilerplate', true, resolve);
            });
            // Copy file and add template variables
            yield cli_core_1.Utils.copyTemplateFiles(cli_core_1.Utils.fromProjectRoot('./plugin-boilerplate'), cli_core_1.Utils.fromProjectRoot(answers.GIT_REPO), {
                force: true,
                prompt: false,
                variables: answers,
                writeFiles: ['package.json', 'README.md', 'src/index.ts', 'src/__tests__/index.test.ts'],
            });
            // Delete original folder
            execSync(`rm -rf plugin-boilerplate`);
            // Change working directory
            process.chdir(cli_core_1.Utils.fromProjectRoot(answers.GIT_REPO));
            // Delete .git dir
            execSync(`rm -rf .git`);
            ////////////////////////////
            ///// Add dependencies /////
            ////////////////////////////
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/expo',
                level: 'info',
                message: '📦 Installing dependencies...',
            });
            // Install dependencies
            cli_core_1.Utils.installMissing(dependencies_1.requiredDependencies, false);
            cli_core_1.Utils.installMissing(dependencies_1.requiredDevDependencies, true);
            // Finish
            cli_core_1.Utils.logger.log({
                label: '@bluebase/cli/expo',
                level: 'info',
                message: '✅ Done! BlueBase Plugin Boilerplate initialized.',
            });
        });
    }
}
ExpoStart.description = 'Creates a boilerplate for BlueBase Plugin development.';
ExpoStart.examples = [
    '$ bluebase plugin:create',
];
exports.default = ExpoStart;
//# sourceMappingURL=create.js.map