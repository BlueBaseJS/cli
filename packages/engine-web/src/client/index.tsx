import 'normalize.css';

import React from 'react';
import { render } from 'react-dom';
import ReactHotLoader from './components/ReactHotLoader';

import App from './App';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp: any) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <TheApp />
    </ReactHotLoader>
  );

  render(app, container);
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && (module as any).hot) {
  // Accept changes to this file for hot reloading.
	// (module as any).hot.accept('./src');
  // Any changes to our App will cause a hotload re-render.
	(module as any).hot.accept('./App.js', () => {
    renderApp(require('./App').default);
  });
}
