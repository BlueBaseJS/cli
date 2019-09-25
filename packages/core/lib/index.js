"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __importStar(require("./utils"));
exports.Utils = Utils;
__export(require("./FileManager"));
// Init
var init_1 = require("./init");
exports.init = init_1.default;
__export(require("./init/copyTemplateFiles"));
__export(require("./init/dependencies"));
//# sourceMappingURL=index.js.map