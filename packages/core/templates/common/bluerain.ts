// This file contain all the apps, plugins and configuration which are required
// for booting bluebase. see https://blueeast.gitbooks.io/bluebase/
export default {
	apps:[],
	platform: [
		require('@blueeast/bluebase-platform-react-native')
	],
	plugins:[
		require('@blueeast/bluebase-plugin-react-router'),
		require('@blueeast/bluebase-plugin-redux'),
	],
};
