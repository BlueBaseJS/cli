'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('normalize.css/normalize.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

require('./globals.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Error404 from './Error404';
// import Header from './Header';

// import AsyncHomeRoute from './AsyncHomeRoute';
// import AsyncCounterRoute from './AsyncCounterRoute';
// import AsyncAboutRoute from './AsyncAboutRoute';

function DemoApp() {
  return _react2.default.createElement(
    'div',
    { style: { padding: '2rem' } },
    _react2.default.createElement(
      _reactHelmet2.default,
      null,
      _react2.default.createElement('html', { lang: 'en' }),
      _react2.default.createElement('meta', { charSet: 'utf-8' }),
      _react2.default.createElement('meta', { name: 'application-name', content: 'BlueRain' }),
      _react2.default.createElement('meta', { name: 'description', content: 'BlueRain' }),
      _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
      _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      _react2.default.createElement('meta', { name: 'msapplication-TileColor', content: '#2b2b2b' }),
      _react2.default.createElement('meta', { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' }),
      _react2.default.createElement('meta', { name: 'theme-color', content: '#2b2b2b' }),
      _react2.default.createElement(
        'title',
        null,
        'BlueRain'
      ),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '152x152',
        href: '/favicons/apple-touch-icon-152x152.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '144x144',
        href: '/favicons/apple-touch-icon-144x144.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '120x120',
        href: '/favicons/apple-touch-icon-120x120.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '114x114',
        href: '/favicons/apple-touch-icon-114x114.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '76x76',
        href: '/favicons/apple-touch-icon-76x76.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '72x72',
        href: '/favicons/apple-touch-icon-72x72.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '57x57',
        href: '/favicons/apple-touch-icon-57x57.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon-precomposed',
        sizes: '60x60',
        href: '/favicons/apple-touch-icon-60x60.png'
      }),
      _react2.default.createElement('link', {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon-180x180.png'
      }),
      _react2.default.createElement('link', { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#00a9d9' }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-196x196.png', sizes: '196x196' }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-128.png', sizes: '128x128' }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' }),
      _react2.default.createElement('link', { rel: 'icon', sizes: '16x16 32x32', href: '/favicon.ico' }),
      _react2.default.createElement('meta', { name: 'msapplication-TileColor', content: '#2b2b2b' }),
      _react2.default.createElement('meta', { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' }),
      _react2.default.createElement('meta', { name: 'msapplication-square70x70logo', content: '/favicons/mstile-70x70.png' }),
      _react2.default.createElement('meta', { name: 'msapplication-square150x150logo', content: '/favicons/mstile-150x150.png' }),
      _react2.default.createElement('meta', { name: 'msapplication-wide310x150logo', content: '/favicons/mstile-310x150.png' }),
      _react2.default.createElement('meta', { name: 'msapplication-square310x310logo', content: '/favicons/mstile-310x310.png' }),
      _react2.default.createElement('link', { rel: 'manifest', href: '/manifest.json' }),
      _react2.default.createElement('link', {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic'
      }),
      _react2.default.createElement('link', {
        rel: 'stylesheet',
        href: '//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css'
      })
    )
  );
}

exports.default = DemoApp;