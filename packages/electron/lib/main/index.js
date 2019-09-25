'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const electron_1 = require("electron");
const url_1 = require("url");
const isDevelopment = process.env.NODE_ENV !== 'production';
// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;
function createMainWindow() {
    const window = new electron_1.BrowserWindow();
    if (isDevelopment) {
        window.webContents.openDevTools();
    }
    if (isDevelopment) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    }
    else {
        window.loadURL(url_1.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }));
    }
    window.on('closed', () => {
        mainWindow = null;
    });
    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });
    return window;
}
// quit application when all windows are closed
electron_1.app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});
// create main BrowserWindow when electron is ready
electron_1.app.on('ready', () => {
    mainWindow = createMainWindow();
});
//# sourceMappingURL=index.js.map