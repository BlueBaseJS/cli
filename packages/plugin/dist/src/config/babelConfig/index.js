'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = customBabelConfigs;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _babel = require('./babel');

var _babel2 = _interopRequireDefault(_babel);

var _utils = require('../../internal/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customBabelConfigs(appBableRcPath) {
	let customBabelConfig;
	if (_fs2.default.existsSync(appBableRcPath)) {
		const content = _fs2.default.readFileSync(appBableRcPath, 'utf-8');
		try {
			customBabelConfig = _json2.default.parse(content);
			customBabelConfig.babelrc = false;
			(0, _utils.log)({
				title: 'Babel',
				level: 'info',
				message: 'Loading custom babelrc configs'
			});
		} catch (e) {
			(0, _utils.log)({
				title: 'Babel',
				level: 'error',
				message: `Error parsing .babelrc file: ${e.message}`
			});
			throw e;
		}
	}

	if (!customBabelConfig) {
		(0, _utils.log)({
			title: 'Babel',
			level: 'info',
			message: 'Loading default bablerc configs'
		});
		return _babel2.default;
	}

	return customBabelConfig;
}