import { BlueBaseApp } from "@bluebase/core";
import React from "react";
import bootConfig from "<%= BLUERAIN_JS_PATH %>";

const App = () => React.createElement(BlueBaseApp, bootConfig);

export default App;
