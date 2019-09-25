"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Flags = require("./Flags");

Object.keys(_Flags).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Flags[key];
    }
  });
});

var _configs = require("./configs");

Object.keys(_configs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _configs[key];
    }
  });
});

var _webpack = require("./webpack");

Object.keys(_webpack).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _webpack[key];
    }
  });
});

var _WebpackHookArguments = require("./WebpackHookArguments");

Object.keys(_WebpackHookArguments).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _WebpackHookArguments[key];
    }
  });
});