// import { BlueBase, Plugin } from '@bluebase/core';
// import { AppContainer } from 'react-hot-loader';
// import React from 'react';
// // import ReactHotLoader from './ReactHotLoader';

// const AppContainerHoc = (App: React.ComponentType) => (props: any) => {
// 	return <AppContainer>
// 		<App {...props} />
// 	</AppContainer>;
// };

// const ReactHotLoaderPlugin = {

// 	key: 'react-hot-loader',
// 	name: 'ReactHotLoaderPlugin',

// 	static initialize(_config: any, BR: BlueBase) {
// 		BR.Components.addHocs('SystemApp', AppContainerHoc);

// 		// The following is needed so that we can support hot reloading our application.
// 		// Any changes to our App will cause a hotload re-render.
// 		// tslint:disable-next-line
// 		(module as any).hot.accept('../../App.js', () => {
// 			// tslint:disable-next-line:no-console
// 			console.log('hitting ho reload!');
// 			BR.reboot();
// 		});
// 	}
// }

