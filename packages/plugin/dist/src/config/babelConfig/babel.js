'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	// Don't try to find .babelrc because we want to force this configuration.
	babelrc: false,
	presets: ['env', 'stage-3', 'react']
};