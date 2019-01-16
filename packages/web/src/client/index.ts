import 'normalize.css';
import App from 'APP_JS';
import { AppRegistry } from 'react-native';

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
	initialProps: {},
	rootTag: document.querySelector('#app')
});

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
// tslint:disable-next-line
require('./registerServiceWorker');
