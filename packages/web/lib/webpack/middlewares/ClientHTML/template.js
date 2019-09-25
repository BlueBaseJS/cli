"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = require("../../../server/components");

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

// tslint:disable-next-line:no-submodule-imports
var _default = () => `<!DOCTYPE html>${(0, _server.renderToStaticMarkup)(_react.default.createElement(_components.HTML, null))}`;

exports.default = _default;