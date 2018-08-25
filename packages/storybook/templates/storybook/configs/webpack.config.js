const { storybookWebpackConfigs } = require('@blueeast/bluerain-cli-essentials');

module.exports = (baseConfig, env, config) => {

	config = storybookWebpackConfigs(baseConfig, env, config);

	return config;
};
