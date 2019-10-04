import App from './<%= STORYBOOK_APP_PATH %>';
import KeepAwake from 'expo-keep-awake';
import { registerRootComponent } from 'expo';

if (__DEV__) {
	KeepAwake.activate();
}

registerRootComponent(App);
