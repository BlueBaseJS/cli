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
const winston_1 = require("winston");
const paths_1 = require("../paths");
const node_notifier_1 = __importDefault(require("node-notifier"));
//////// Notify
const successIcon = paths_1.fromCore('./assets/br-success.png');
const errorIcon = paths_1.fromCore('./assets/br-failed.png');
// Ignore log messages if they have { private: true }
const notifyFormatter = winston_1.format((info) => {
    const { notify } = info, rest = __rest(info, ["notify"]);
    const icon = info.level === 'error' ? errorIcon : successIcon;
    if (notify === true) {
        node_notifier_1.default.notify({
            icon,
            message: info.message,
            title: info.label,
        });
    }
    return rest;
});
exports.default = notifyFormatter;
//# sourceMappingURL=notifyFormatter.js.map