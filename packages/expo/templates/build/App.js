import { BlueBaseApp } from '@bluebase/core';
import React from 'react';
import bootConfig from '<%= BLUEBASE_JS_PATH %>';

const App = () => React.createElement(BlueBaseApp, bootConfig);

export default App;
