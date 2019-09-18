"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const removeNil_1 = __importDefault(require("../arrays/removeNil"));
/**
 * Deeply merges a given set of objects together.
 *
 * Objects to the right take priority.
 *
 * @param  {...Object} args - The objects to merge.
 *
 * @return {Object} - The merged object.
 */
function mergeDeep(...args) {
    const filtered = removeNil_1.default(args);
    if (filtered.length < 1) {
        return {};
    }
    if (filtered.length === 1) {
        return args[0];
    }
    return filtered.reduce((acc, cur) => {
        Object.keys(cur).forEach(key => {
            // tslint:disable-next-line:prefer-conditional-expression
            if (typeof acc[key] === 'object' && typeof cur[key] === 'object') {
                // eslint-disable-next-line no-param-reassign
                acc[key] = mergeDeep(acc[key], cur[key]);
            }
            else {
                // eslint-disable-next-line no-param-reassign
                acc[key] = cur[key];
            }
        });
        return acc;
    }, {});
}
exports.default = mergeDeep;
//# sourceMappingURL=mergeDeep.js.map