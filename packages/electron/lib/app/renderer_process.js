"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("normalize.css");
const App_1 = __importDefault(require("./App"));
// tslint:disable-next-line:no-var-requires
const { AppRegistry } = require('react-native');
// register the app
AppRegistry.registerComponent('App', () => App_1.default);
AppRegistry.runApplication('App', {
    initialProps: {},
    rootTag: document.querySelector('#app')
});
//# sourceMappingURL=renderer_process.js.map