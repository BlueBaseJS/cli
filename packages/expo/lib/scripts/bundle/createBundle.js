"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBundle = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _cliCore = require("@bluebase/cli-core");

var _fromRoot = _interopRequireDefault(require("../fromRoot"));

var _fs = _interopRequireDefault(require("fs"));

var _getAppJson = require("./getAppJson");

var _getBlueBasePath = require("./getBlueBasePath");

var _path = _interopRequireDefault(require("path"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _shelljs = _interopRequireDefault(require("shelljs"));

const createBundle = async ({
  assetsDir,
  buildDir,
  configDir,
  appJsPath,
  name,
  templateVars
}) => {
  ///////////////////////////
  ///// Clear build dir /////
  ///////////////////////////
  // Delete dir if already exists
  if (_fs.default.existsSync(buildDir)) {
    _rimraf.default.sync(buildDir);
  } // Create a new build dir


  _shelljs.default.mkdir('-p', buildDir); // /////////////////////////////
  // ///// Generate app.json /////
  // /////////////////////////////


  const appJson = await (0, _getAppJson.getAppJson)({
    assetsDir,
    buildDir,
    configDir,
    name
  }); ///////////////////////////
  ///// Generate app.js /////
  ///////////////////////////

  const bluebaseJsPath = await (0, _getBlueBasePath.getBlueBasePath)({
    configDir,
    name
  }); // Checks if Custom App.js exists in configDir

  let appJsLocation = 'App';

  if (_fs.default.existsSync(appJsPath + '.js')) {
    appJsLocation = _path.default.relative(buildDir, appJsPath);
  } ///////////////////////
  ///// Write files /////
  ///////////////////////


  await _cliCore.Utils.copyTemplateFiles((0, _fromRoot.default)('./templates/build'), buildDir, {
    force: true,
    prompt: false,
    variables: (0, _objectSpread2.default)({
      'APP_JSON': JSON.stringify(appJson, null, 2),
      'APP_JS_PATH': `./${appJsLocation}`,
      'BLUERAIN_JS_PATH': `./${_path.default.relative(buildDir, bluebaseJsPath)}`
    }, templateVars),
    writeFiles: ['App.js', 'app.json', 'AppEntry.js']
  });
};

exports.createBundle = createBundle;