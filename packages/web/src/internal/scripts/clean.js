/**
 * This script removes any exisitng build output.
 */

import { resolve as pathResolve } from 'path';
import rimraf from 'rimraf';
import config from '../../config';

function clean() {
  rimraf(pathResolve(config('projectRootDir'), config('buildOutputPath')), () => {
    console.log(`Cleaned ${pathResolve(config('projectRootDir'), config('buildOutputPath'))}`);
  });
}

clean();
