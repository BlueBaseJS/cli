'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeDeep;

var _removeNil = require('../arrays/removeNil');

var _removeNil2 = _interopRequireDefault(_removeNil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  const filtered = (0, _removeNil2.default)(args);
  if (filtered.length < 1) {
    return {};
  }
  if (filtered.length === 1) {
    return args[0];
  }
  return filtered.reduce((acc, cur) => {
    Object.keys(cur).forEach(key => {
      if (typeof acc[key] === 'object' && typeof cur[key] === 'object') {
        // eslint-disable-next-line no-param-reassign
        acc[key] = mergeDeep(acc[key], cur[key]);
      } else {
        // eslint-disable-next-line no-param-reassign
        acc[key] = cur[key];
      }
    });
    return acc;
  }, {});
}