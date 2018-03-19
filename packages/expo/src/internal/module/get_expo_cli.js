import path from 'path';
import fs from 'fs';

const Expo = (function getExpoCli() {
  const bluerainExpoCliPath = path.resolve(__dirname, '../../../node_modules/.bin/exp');
  const targetExpoCliPath = 'node_modules/.bin/exp';
  return function whichExpoCli() {
    return fs.existsSync(targetExpoCliPath) ? targetExpoCliPath : bluerainExpoCliPath;
  };
}());

export default Expo;
