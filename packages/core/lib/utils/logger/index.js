"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorFormatter_1 = require("./colorFormatter");
const notifyFormatter_1 = __importDefault(require("./notifyFormatter"));
const winston_1 = __importDefault(require("winston"));
const alignedWithColorsAndTime = winston_1.default.format.combine(notifyFormatter_1.default(), colorFormatter_1.addColorToLabel(), winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.align(), winston_1.default.format.printf((info) => {
    const { timestamp, level, label, message } = info, args = __rest(info, ["timestamp", "level", "label", "message"]);
    const labelStr = label ? `${label} ` : '';
    // const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${labelStr}${level}: ${message}	${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
}));
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            // colorize: true,
            format: alignedWithColorsAndTime,
        }),
    ]
});
exports.default = logger;
//# sourceMappingURL=index.js.map