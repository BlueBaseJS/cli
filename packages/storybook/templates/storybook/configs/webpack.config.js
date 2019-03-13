const { storybookWebpackConfigs } = require('@bluebase/cli-essentials');

module.exports = (configBundle) => {

	config = storybookWebpackConfigs(configBundle);

	return config;
};
