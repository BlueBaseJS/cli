"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("../paths");
const install_1 = require("./install");
const fs_1 = __importDefault(require("fs"));
/**
 * Takes a list of dependencies and installs only those that are
 * not already installed.
 *
 * @param dep An array of dependencies to check and install
 * @param dev Is this a dev dependency?
 */
exports.installMissing = (deps = [], dev = false) => {
    // Read package.json
    const pkgJsonPath = paths_1.fromProjectRoot('package.json');
    let pkgJson = {};
    // Delete dir if already exists
    if (fs_1.default.existsSync(pkgJsonPath)) {
        const pkgJsonBuffer = fs_1.default.readFileSync(pkgJsonPath);
        pkgJson = JSON.parse(pkgJsonBuffer.toString());
    }
    pkgJson = Object.assign({ dependencies: {}, devDependencies: {} }, pkgJson);
    const checkDeps = dev === true ? pkgJson.devDependencies : pkgJson.dependencies;
    // This will have the final list to install
    const depsToInstall = [];
    // Remove those already installed
    if (checkDeps) {
        deps.forEach(dep => {
            // For cases like react@^16.3.1
            const name = dep.substring(0, dep.lastIndexOf('@'));
            if (!checkDeps[dep] && !checkDeps[name]) {
                depsToInstall.push(dep);
            }
        });
    }
    // Install!
    if (depsToInstall.length > 0) {
        install_1.install({ deps: depsToInstall, dev });
    }
};
//# sourceMappingURL=installMissing.js.map