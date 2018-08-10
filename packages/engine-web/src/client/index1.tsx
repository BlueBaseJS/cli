import '../../public/globals.css';

import { render } from 'react-dom';
import App from './App';
import React from 'react';
// import ReactHotLoader from './components/ReactHotLoader';
import { hot } from 'react-hot-loader';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

const isDev = process.env.NODE_ENV === 'development';

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp: React.ComponentType) {
	// Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
	// const app = (
	// 	<ReactHotLoader>
  //     <TheApp />
  //   </ReactHotLoader>
	// );
	// const app = (App.default ? App.default : App);
	const RenderApp = isDev ? hot(module)(TheApp) : TheApp;
	render(<RenderApp />, container);
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
// tslint:disable-next-line:no-var-requires
require('./registerServiceWorker');

// // The following is needed so that we can support hot reloading our application.
// if (process.env.BUILD_FLAG_IS_DEV === 'true' && (module as any).hot) {
//   // Accept changes to this file for hot reloading.
// 	(module as any).hot.accept('./index.js');
//   // Any changes to our App will cause a hotload re-render.
// 	(module as any).hot.accept('../components/MainApp/index.js', () => {
// 		renderApp(require('../components/MainApp').default);
// 	});
// }
