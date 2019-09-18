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
const deepmerge_1 = __importDefault(require("deepmerge"));
const fromRoot_1 = __importDefault(require("./fromRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_template_1 = __importDefault(require("lodash.template"));
/**
 * Copy template files to project directory.
 */
exports.copyTemplateFiles = (assetsDir, configDir) => __awaiter(this, void 0, void 0, function* () {
    yield cli_core_1.copyTemplateFiles(assetsDir, configDir);
    // Copy files
    yield cli_core_1.Utils.copyAll(fromRoot_1.default('templates/storybook-native'), cli_core_1.Utils.fromProjectRoot(configDir));
    yield cli_core_1.Utils.copyAll(fromRoot_1.default('templates/assets'), cli_core_1.Utils.fromProjectRoot(assetsDir));
    ///// Read package.json
    let pkgJson = {};
    const pkgJsonPath = cli_core_1.Utils.fromProjectRoot('package.json');
    // Delete dir if already exists
    if (fs_1.default.existsSync(pkgJsonPath)) {
        const pkgJsonBuffer = fs_1.default.readFileSync(pkgJsonPath);
        pkgJson = JSON.parse(pkgJsonBuffer.toString());
    }
    // Package.json template
    const pkgTemplateBuffer = fs_1.default.readFileSync(fromRoot_1.default('templates/package.template.json'));
    const pkgTemplate = pkgTemplateBuffer.toString();
    const compiled = lodash_template_1.default(pkgTemplate);
    const pkgCompiled = compiled({ 'CONFIG_DIR_PATH': path_1.default.relative(cli_core_1.Utils.fromProjectRoot(), configDir) });
    pkgJson = deepmerge_1.default(JSON.parse(pkgCompiled), pkgJson);
    // Update package.json
    fs_1.default.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
});
//# sourceMappingURL=copyTemplateFiles.js.map