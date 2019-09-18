"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Filters out all null/undefined items from the given array.
 *
 * @param  {Array} as - the target array
 *
 * @return {Array} The filtered array.
 */
function removeNil(as) {
    return as.filter(a => a != null);
}
exports.default = removeNil;
//# sourceMappingURL=removeNil.js.map