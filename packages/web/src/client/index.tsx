import 'normalize.css';

// import { render } from 'react-dom';
import App from './App';
// import React from 'react';
// import { AppRegistry } from 'react-native';
const { AppRegistry } = require('react-native');

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
	initialProps: {},
	rootTag: document.querySelector('#app')
});

// // Execute the first render of our app.
// render(<App />, document.querySelector('#app'));

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
// tslint:disable-next-line:no-var-requires
require('./registerServiceWorker');
