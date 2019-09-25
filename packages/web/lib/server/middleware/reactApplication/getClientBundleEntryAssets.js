"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _paths = require("@bluebase/cli-core/lib/utils/paths");

var _fs = _interopRequireDefault(require("fs"));

/**
 * This file resolves the entry assets available from our client bundle.
 */
let resultCache;
/**
 * Retrieves the js/css for the named chunks that belong to our client bundle.
 *
 * Note: the order of the chunk names is important. The same ordering will be
 * used when rendering the scripts.
 *
 * This is useful to us for a couple of reasons:
 *   - It allows us to target the assets for a specific chunk, thereby only
 *     loading the assets we know we will need for a specific request.
 *   - The assets are hashed, and therefore they can't be "manually" added
 *     to the render logic.  Having this method allows us to easily fetch
 *     the respective assets simply by using a chunk name. :)
 */

var _default = configs => () => {
  // Return the assets json cache if it exists.
  // In development mode we always read the assets json file from disk to avoid
  // any cases where an older version gets cached.
  if (process.env.BUILD_FLAG_IS_DEV === 'false' && resultCache) {
    return resultCache;
  } // tslint:disable-next-line:max-line-length


  const assetsFilePath = (0, _paths.fromProjectRoot)(`${configs.clientConfigs.outputPath}/${configs.clientConfigs.bundleAssetsFileName}`);

  if (!_fs.default.existsSync(assetsFilePath)) {
    throw new Error( // tslint:disable-next-line:max-line-length
    `We could not find the "${assetsFilePath}" file, which contains a list of the assets of the client bundle.  Please ensure that the client bundle has been built.`);
  }

  const readAssetsJSONFile = () => JSON.parse(_fs.default.readFileSync(assetsFilePath, 'utf8'));

  const assetsJSONCache = readAssetsJSONFile();

  if (typeof assetsJSONCache.index === 'undefined') {
    throw new Error('No asset data found for expected "index" entry chunk of client bundle.');
  }

  resultCache = assetsJSONCache.index;
  return resultCache;
};

exports.default = _default;