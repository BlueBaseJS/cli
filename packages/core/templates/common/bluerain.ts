// This file contain all the apps, plugins and configuration which are required
// for booting bluerain-os. see https://blueeast.gitbooks.io/bluerain-os/
export default {
	apps:[],
	platform: [
		require('@blueeast/bluerain-platform-react-native')
	],
	plugins:[
		require('@blueeast/bluerain-plugin-react-router'),
		require('@blueeast/bluerain-plugin-redux'),
	],
};
