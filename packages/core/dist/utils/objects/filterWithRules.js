"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterWithRulesLoop(rules, obj, basePropPath = '') {
    return Object.keys(rules).reduce((acc, key) => {
        const propPath = basePropPath !== '' ? `${basePropPath}.${key}` : key;
        if (typeof rules[key] === 'object') {
            if (typeof obj[key] !== 'object') {
                throw new Error(`Expected prop at path "${propPath}" to be an object`);
            }
            acc[key] = filterWithRulesLoop(rules[key], obj[key], propPath);
        }
        else if (rules[key]) {
            if (typeof obj[key] === 'undefined') {
                throw new Error(`Filter set an "allow" on path "${propPath}", however, this path was not found on the source object.`);
            }
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
/**
 * Applies a rules object to filter a given object's structure.
 *
 * The rules object should match the shape of the source object and should
 * have a truthy/falsey value indicating if a property should be included/
 * excluded.  If the filters do not contain a property that exists on the
 * source object then the respective property will be excluded.
 *
 * @param  {Object} rules : The filter rules.
 * @param  {Object} obj   : The object to filter.
 *
 * @return {Object}
 *   The filtered object.
 *
 * @example
 *   filter(
 *     // rules
 *     {
 *       foo: { bar: true },
 *       poop: true
 *     },
 *     // source
 *     {
 *       foo: { bar: 'bar', qux: 'qux' },
 *       bob: 'bob',
 *       poop: { plop: 'splash' }
 *     },
 *   )
 */
function filterWithRules(rules, obj) {
    return filterWithRulesLoop(rules, obj);
}
exports.default = filterWithRules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyV2l0aFJ1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL29iamVjdHMvZmlsdGVyV2l0aFJ1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkJBQTZCLEtBQWMsRUFBRSxHQUFZLEVBQUUsZUFBdUIsRUFBRTtJQUNuRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUMvQixDQUFDLEdBQVksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNyQixNQUFNLFFBQVEsR0FBRyxZQUFZLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXRFLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ25DLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixRQUFRLG1CQUFtQixDQUFDLENBQUM7YUFDdkU7WUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUNwQyxNQUFNLElBQUksS0FBSyxDQUNSLGtDQUFrQyxRQUFRLDJEQUEyRCxDQUN0RyxDQUFDO2FBQ1A7WUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDLEVBQ0MsRUFBRSxDQUNILENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCx5QkFBd0MsS0FBYSxFQUFFLEdBQVc7SUFDakUsT0FBTyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUZELGtDQUVDIn0=