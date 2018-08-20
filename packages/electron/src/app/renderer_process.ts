import 'normalize.css';

import App from './App';
// tslint:disable-next-line:no-var-requires
const { AppRegistry } = require('react-native');

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
	initialProps: {},
	rootTag: document.querySelector('#app')
});
