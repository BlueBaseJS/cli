import BR from '@bluebase/core';
import bootConfig from '<%= BLUERAIN_JS_PATH %>';
bootConfig.renderApp = false;
export default BR.boot(bootConfig);
