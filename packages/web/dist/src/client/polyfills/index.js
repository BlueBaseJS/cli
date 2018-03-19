'use strict';

var _modernizr = require('modernizr');

var _modernizr2 = _interopRequireDefault(_modernizr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is just an illustrative example.  Here you are testing the client's
// support for the "picture" element, and if it isn't supported then you
// load a polyfill.
if (!_modernizr2.default.picture) {
  console.log('Client does not support "picture", polyfilling it...');
  // If you want to use the below do a `npm install picturefill -E -S` and then
  // uncomment the lines below:
  /*
  require('picturefill');
  require('picturefill/dist/plugins/mutation/pf.mutation');
  */
} else {
  console.log('Client has support for "picture".');
} /* eslint-disable no-console */