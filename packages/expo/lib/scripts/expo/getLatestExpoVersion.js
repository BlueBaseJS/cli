"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLatestExpoVersion = void 0;

var _expoVersions = require("./expoVersions");

/**
 * Returns the latest version of expo
 */
const getLatestExpoVersion = () => {
  const versions = [..._expoVersions.expoVersions];
  versions.sort((a, b) => {
    return b.id - a.id;
  });
  return versions[0];
};

exports.getLatestExpoVersion = getLatestExpoVersion;