const path = require('path');
const fs = require('fs');

const Expo = (function() {
	const bluerainExpoCliPath = path.resolve(__dirname, '../../../node_modules/.bin/exp');
	const targetExpoCliPath = 'node_modules/.bin/exp';
	return function() {
		return fs.existsSync(targetExpoCliPath) ? targetExpoCliPath : bluerainExpoCliPath;
	};

}());

module.exports = Expo;
