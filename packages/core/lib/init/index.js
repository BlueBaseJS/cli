"use strict";
/**
 * @deprecated
 * TODO: Remove file
 */
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
const __1 = require("..");
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
const requiredDependencies = [
    'react',
    'typescript',
];
const requiredDevDependencies = [
    '@blueeast/tslint-config-blueeast',
    '@types/react',
];
/**
 * Global initializer.
 *
 * - Create a bluebase/common folder
 * - Add tsconfig and tslint files
 */
exports.default = (configDir, _buildDir) => __awaiter(this, void 0, void 0, function* () {
    // Copy common configs
    yield __1.Utils.copyAll(__1.Utils.fromCore('templates/common'), __1.Utils.fromProjectRoot(configDir, '..', 'common'));
    // Copy tsconfig
    const tsconfigPath = __1.Utils.fromCore('templates/tsconfig.json');
    if (fs_1.default.existsSync(tsconfigPath)) {
        shelljs_1.default.cp('-rf', tsconfigPath, __1.Utils.fromProjectRoot());
    }
    // Copy tslint file & install blueeast configs
    const tslintPath = __1.Utils.fromCore('templates/tslint.json');
    if (fs_1.default.existsSync(tslintPath)) {
        shelljs_1.default.cp('-rf', tslintPath, __1.Utils.fromProjectRoot());
    }
    // Install dependencies
    const pkgJsonPath = __1.Utils.fromProjectRoot('package.json');
    const pkgJson = JSON.parse(fs_1.default.readFileSync(pkgJsonPath).toString());
    const depsToInstall = [];
    const devDepsToInstall = [];
    if (pkgJson.dependencies) {
        requiredDependencies.forEach(dep => {
            if (!pkgJson.dependencies[dep]) {
                depsToInstall.push(dep);
            }
        });
    }
    if (pkgJson.devDependencies) {
        requiredDevDependencies.forEach(dep => {
            if (!pkgJson.devDependencies[dep]) {
                devDepsToInstall.push(dep);
            }
        });
    }
    if (depsToInstall.length > 0) {
        __1.Utils.install({ deps: depsToInstall, dev: false });
    }
    if (devDepsToInstall.length > 0) {
        __1.Utils.install({ deps: devDepsToInstall, dev: true });
    }
});
//# sourceMappingURL=index.js.map