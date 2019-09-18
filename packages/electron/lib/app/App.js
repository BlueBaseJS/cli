"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const core_1 = require("@bluebase/core");
// import ReactHotLoaderPlugin from './ReactHotLoaderPlugin/HOC';
// tslint:disable-next-line:no-var-requires
let bootConfig = require('BLUERAIN_BOOT_OPTIONS');
// ES Module
bootConfig = bootConfig.default ? bootConfig.default : bootConfig;
// const isDev = process.env.BUILD_FLAG_IS_DEV === 'true';
// const isClient = process.env.BUILD_FLAG_IS_CLIENT === 'true';
// const isSSR = process.env.BUILD_FLAG_IS_SSR === 'true';
// if (isDev && isClient) {
// 	bootConfig.plugins = bootConfig.plugins || [];
// 	bootConfig.plugins.push(ReactHotLoaderPlugin);
// }
const App = () => (React.createElement(core_1.BlueBaseApp, Object.assign({}, bootConfig)));
exports.default = App;
//# sourceMappingURL=App.js.map