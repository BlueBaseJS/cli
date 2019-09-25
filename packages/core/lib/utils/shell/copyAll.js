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
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const shelljs_1 = __importDefault(require("shelljs"));
/**
 * Copies a directory from source to destination. If folder already exists,
 * asks for confirmation to overwrite.
 * @param src
 * @param dest
 */
exports.copyAll = (src, dest, prompt = true, force = false) => __awaiter(this, void 0, void 0, function* () {
    // If dest folder already exists, ask for overwrite confirmation
    if (fs_1.default.existsSync(dest) && !force) {
        if (prompt) {
            // Prompt
            const answers = yield inquirer_1.default.prompt([
                {
                    default: false,
                    message: `A directory already exists at ${dest}. Do you want to overwrite?`,
                    name: 'overwrite',
                    type: 'confirm',
                }
            ]);
            if (!answers.overwrite === true) {
                return;
            }
        }
        else {
            return;
        }
    }
    else {
        // Create nested dirs
        shelljs_1.default.mkdir('-p', dest);
    }
    shelljs_1.default.cp('-rf', src + '/{.[!.],}*', dest);
});
//# sourceMappingURL=copyAll.js.map