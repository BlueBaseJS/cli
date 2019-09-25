"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("../paths");
const deepmerge_1 = __importDefault(require("deepmerge"));
const fs_1 = __importDefault(require("fs"));
/**
 * Takes an object, and merges it into the package.json
 * file of the porcess root.
 * @param pkg
 */
exports.mergePackageJson = (pkg) => {
    const pkgJsonPath = paths_1.fromProjectRoot('package.json');
    let pkgJson = {};
    // Delete dir if already exists
    if (fs_1.default.existsSync(pkgJsonPath)) {
        const pkgJsonBuffer = fs_1.default.readFileSync(pkgJsonPath);
        pkgJson = JSON.parse(pkgJsonBuffer.toString());
    }
    const newPkg = deepmerge_1.default(pkgJson, pkg);
    // Update package.json
    fs_1.default.writeFileSync(pkgJsonPath, JSON.stringify(newPkg, null, 2));
};
//# sourceMappingURL=mergePackageJson.js.map