const { storybookWebpackConfigs } = require('@bluebase/cli-essentials');

module.exports = (baseConfig, env, config) => {

	config = storybookWebpackConfigs(baseConfig, env, config);

	return config;
};
