import loadConfig from './loadConfig';

const getWebpackConfig = (configDir, configType = 'DEVELOPMENT') => {
	const config = loadConfig(configType, configDir);

	return config;
};

export default getWebpackConfig;

