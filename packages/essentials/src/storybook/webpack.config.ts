const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

export default (_baseConfig: any, _env: any, config: any) => {

	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		loader: require.resolve('awesome-typescript-loader')
	});

	config.plugins.push(new TSDocgenPlugin()); // optional
	config.resolve.extensions.push('.ts', '.tsx');

	config.resolve.extensions.push('.ts', '.tsx');
	
	config.resolve.alias['react-native$'] = require.resolve('react-native-web');
	config.resolve.alias['react-art$'] = require.resolve('react-art');

	return config;
};
