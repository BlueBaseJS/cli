const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (baseConfig, env, config) => {

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

// // load the default config generator.
// const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

// module.exports = (baseConfig, env) => {
// 	const config = genDefaultConfig(baseConfig, env);

// 	config.module.rules.push({
// 		test: /\.(ts|tsx)$/,
// 		loader: require.resolve('awesome-typescript-loader')
// 	});

// 	config.resolve.extensions.push('.ts', '.tsx');
// 	config.resolve.alias['react-native$'] = 'react-native-web';

// 	return config;
// };