// This file contain all the apps, plugins and configuration which are required
// for booting bluerain-os. see https://blueeast.gitbooks.io/bluerain-os/
export default {
	platform: [
		require('@blueeast/bluerain-platform-react-native')
	],
	apps:[],
	plugins:[
		require('@blueeast/bluerain-plugin-react-router'),
		require('@blueeast/bluerain-plugin-redux'),
	],
};
