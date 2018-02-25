const assign = require('babel-runtime/core-js/object/assign').default;
const buildStatic = require('./build-static');
const buildDev = require('./build-dev');

module.exports = assign({}, buildStatic, buildDev );
