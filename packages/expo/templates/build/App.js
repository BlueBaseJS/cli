import React from 'react';
import { BlueBaseApp } from '@bluebase/core';
import bootConfig from '<%= BLUERAIN_JS_PATH %>';

const App = () => React.createElement(BlueBaseApp, bootConfig);

export default App;
