"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execIfFunc = (x) => (typeof x === 'function' ? x() : x);
/**
 * This is a higher order function that accepts a boolean condition and will
 * return a function allowing you to provide if/else values that should be
 * resolved based on the boolean condition.
 *
 * @param  {Boolean|() => Boolean} condition:
 *   The condition to test against. This can be a function for lazy resolution.
 *
 * @return {(X|() => X, Y|() => Y) => X|Y}
 *   A function where the first paramater is the "if" and the second paramater
 *   is the "else".  Each of these allows lazy resolving by providing a function.
 *
 * @example
 *   const ifDev = ifElse(process.env.NODE_ENV === 'development');
 *   ifDev('foo', () => 'lazy resolved');  // => 'foo'
 */
function ifElse(condition) {
    return (then, or) => (execIfFunc(condition) ? execIfFunc(then) : execIfFunc(or));
}
exports.default = ifElse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZFbHNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2xvZ2ljL2lmRWxzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRW5FOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILGdCQUErQixTQUFvQjtJQUNsRCxPQUFPLENBQUMsSUFBWSxFQUFFLEVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUZELHlCQUVDIn0=