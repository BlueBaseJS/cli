"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ClientConfigs = require("./ClientConfigs");

Object.keys(_ClientConfigs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ClientConfigs[key];
    }
  });
});

var _ServerConfigs = require("./ServerConfigs");

Object.keys(_ServerConfigs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ServerConfigs[key];
    }
  });
});