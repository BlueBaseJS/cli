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
const shell_1 = require("../shell");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_template_1 = __importDefault(require("lodash.template"));
/**
 * Copies files from src to dest. Injects variable in writable files.
 * @param src Path to template src
 * @param dest Path to template dest
 * @param opts Options
 */
exports.copyTemplateFiles = (src, dest, opts) => __awaiter(this, void 0, void 0, function* () {
    const { force, prompt, writeFiles, variables } = Object.assign({ force: false, prompt: true, variables: {}, writeFiles: [] }, opts);
    yield shell_1.copyAll(src, dest, prompt, force);
    writeFiles.forEach(file => {
        const filePath = path_1.default.join(dest, file);
        // Inject bluebase.js path in template
        const fileContent = fs_1.default.readFileSync(filePath).toString();
        // Template
        const inject = lodash_template_1.default(fileContent);
        const compiled = inject(variables);
        // Save file
        fs_1.default.writeFileSync(filePath, compiled);
    });
    return;
});
//# sourceMappingURL=copyTemplateFiles.js.map