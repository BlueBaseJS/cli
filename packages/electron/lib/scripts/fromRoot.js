"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.fromRoot = (...segments) => {
    return path_1.default.resolve(__dirname, '..', '..', ...segments);
};
//# sourceMappingURL=fromRoot.js.map