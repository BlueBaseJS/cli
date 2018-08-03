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
        Object.keys(cur).forEach((key) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VEZWVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL29iamVjdHMvbWVyZ2VEZWVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTRDO0FBRTVDOzs7Ozs7OztHQVFHO0FBQ0gsbUJBQWtDLEdBQUcsSUFBYztJQUNsRCxNQUFNLFFBQVEsR0FBRyxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxFQUFFLENBQUM7S0FDVjtJQUNELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDZjtJQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FDbkIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoQyx5REFBeUQ7WUFDekQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUMxRCw2Q0FBNkM7Z0JBQ3BELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3pDO2lCQUFNO2dCQUNDLDZDQUE2QztnQkFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDLEVBQ0csRUFBRSxDQUNILENBQUM7QUFDSixDQUFDO0FBeEJELDRCQXdCQyJ9