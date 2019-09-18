"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  WebpackBuilder: true
};
Object.defineProperty(exports, "WebpackBuilder", {
  enumerable: true,
  get: function () {
    return _WebpackBuilder.default;
  }
});

var _middlewares = require("./middlewares");

Object.keys(_middlewares).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _middlewares[key];
    }
  });
});

var _WebpackBuilder = _interopRequireWildcard(require("./WebpackBuilder"));

Object.keys(_WebpackBuilder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _WebpackBuilder[key];
    }
  });
});