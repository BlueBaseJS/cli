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
const __1 = require("..");
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
/**
 * Global initializer.
 *
 * - Create a bluebase/common folder
 * - Add tsconfig and tslint files
 */
exports.copyTemplateFiles = (assetsDir, configDir) => __awaiter(this, void 0, void 0, function* () {
    // Copy common configs
    yield __1.Utils.copyTemplateFiles(__1.Utils.fromCore('templates/common'), __1.Utils.fromProjectRoot(configDir, '..', 'common'), { prompt: false });
    // Copy common asset files
    yield __1.Utils.copyTemplateFiles(__1.Utils.fromCore('templates/assets'), __1.Utils.fromProjectRoot(assetsDir, '..', 'common'), { prompt: false });
    // src folder
    yield __1.Utils.copyTemplateFiles(__1.Utils.fromCore('templates/src'), __1.Utils.fromProjectRoot('src'), { prompt: false });
    // Copy tsconfig
    const tsconfigPath = __1.Utils.fromProjectRoot('tsconfig.json');
    if (!fs_1.default.existsSync(tsconfigPath)) {
        shelljs_1.default.cp('-rf', __1.Utils.fromCore('templates/tsconfig.json'), __1.Utils.fromProjectRoot());
    }
    // Copy tslint file & install blueeast configs
    const tslintPath = __1.Utils.fromProjectRoot('tslint.json');
    if (!fs_1.default.existsSync(tslintPath)) {
        shelljs_1.default.cp('-rf', __1.Utils.fromCore('templates/tslint.json'), __1.Utils.fromProjectRoot());
    }
});
//# sourceMappingURL=copyTemplateFiles.js.map