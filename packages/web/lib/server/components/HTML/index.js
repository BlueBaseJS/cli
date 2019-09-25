"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _react = _interopRequireDefault(require("react"));

/**
 * The is the HTML shell for our React Application.
 */
const HTML = props => {
  const {
    htmlAttributes = null,
    headerElements = null,
    bodyElements = null,
    appBodyString = ''
  } = props;
  return _react.default.createElement("html", (0, _extends2.default)({
    style: {
      height: '100%'
    }
  }, htmlAttributes), _react.default.createElement("head", null, headerElements), _react.default.createElement("body", {
    style: {
      height: '100%'
    }
  }, _react.default.createElement("div", {
    className: "application"
  }, _react.default.createElement(_reactHelmet.default, null, _react.default.createElement("html", {
    lang: "en"
  }), _react.default.createElement("meta", {
    charSet: "utf-8"
  }), _react.default.createElement("meta", {
    name: "application-name",
    content: "BlueBase"
  }), _react.default.createElement("meta", {
    name: "description",
    content: "BlueBase"
  }), _react.default.createElement("meta", {
    httpEquiv: "X-UA-Compatible",
    content: "IE=edge"
  }), _react.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), _react.default.createElement("meta", {
    name: "msapplication-TileColor",
    content: "#2b2b2b"
  }), _react.default.createElement("meta", {
    name: "theme-color",
    content: "#2b2b2b"
  }), _react.default.createElement("title", null, "BlueBase"), _react.default.createElement("meta", {
    name: "msapplication-TileColor",
    content: "#2b2b2b"
  }), _react.default.createElement("link", {
    rel: "manifest",
    href: "/manifest.json"
  }))), _react.default.createElement("div", {
    id: "app",
    className: "app-container",
    style: {
      display: 'flex',
      height: '100%'
    },
    dangerouslySetInnerHTML: {
      __html: appBodyString
    }
  }), bodyElements));
};

var _default = HTML;
exports.default = _default;