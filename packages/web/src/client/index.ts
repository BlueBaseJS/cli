import 'normalize.css';

// import App from './App';
// tslint:disable-next-line:no-var-requires
const App = require('CUSTOM_APP_JS');
// tslint:disable-next-line:no-var-requires
const { AppRegistry } = require('react-native');

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
	initialProps: {},
	rootTag: document.querySelector('#app')
});

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');
