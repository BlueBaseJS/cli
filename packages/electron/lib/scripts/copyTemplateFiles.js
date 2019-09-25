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
const fromRoot_1 = require("./fromRoot");
const path_1 = __importDefault(require("path"));
/**
 * Copy template files to project directory.
 */
exports.copyTemplateFiles = (assetsDir, configDir) => __awaiter(this, void 0, void 0, function* () {
    yield cli_core_1.copyTemplateFiles(assetsDir, configDir);
    // Copy files
    yield cli_core_1.Utils.copyAll(fromRoot_1.fromRoot('templates/assets'), cli_core_1.Utils.fromProjectRoot(assetsDir), true, false);
    yield cli_core_1.Utils.copyTemplateFiles(fromRoot_1.fromRoot('./templates/electron'), cli_core_1.Utils.fromProjectRoot(configDir), {
        force: false,
        prompt: true,
        variables: {
            'ASSET_DIR_PATH': `./${path_1.default.relative(configDir, assetsDir)}`,
        },
        writeFiles: ['bluebase.ts'],
    });
    ///// Read package.json
    cli_core_1.Utils.mergePackageJson({
        scripts: {
            'electron:start': 'bluebase electron:start'
        }
    });
});
//# sourceMappingURL=copyTemplateFiles.js.map