"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _core = require("@bluebase/core");

// tslint:disable-next-line:no-var-requires
let bootOptions = require('BLUEBASE_BOOT_OPTIONS'); // ES Module


bootOptions = bootOptions.default ? bootOptions.default : bootOptions; // const isDev = process.env.BUILD_FLAG_IS_DEV === 'true';
// const isClient = process.env.BUILD_FLAG_IS_CLIENT === 'true';
// const isSSR = process.env.BUILD_FLAG_IS_SSR === 'true';
// if (isDev && isClient) {
// 	bootConfig.plugins = bootConfig.plugins || [];
// 	bootConfig.plugins.push(ReactHotLoaderPlugin);
// }
// if (isSSR) {
// 	BR.enableSsrMode();
// }

const App = () => React.createElement(_core.BlueBaseApp, bootOptions);

var _default = App;
exports.default = _default;