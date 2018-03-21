import React from 'react';
import Helmet from 'react-helmet';
import App from './app';

const css = `
    html, body, .app-container {
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
        margin: 0;
        font-family: proxima-nova, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif
    }
    *:focus {
        outline: 0;
    }
`;

const BluerainApp = () => (
  <div style={{ width: '100%', height: '100%', cursor: 'default', display: 'flex' }}>
    <Helmet>
      <style>{css}</style>
    </Helmet>
    <App />
  </div>
);

export default BluerainApp;
