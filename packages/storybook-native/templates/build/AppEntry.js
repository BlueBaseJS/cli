import App from './<%= STORYBOOK_APP_PATH %>';
import { activateKeepAwake } from 'expo-keep-awake';
import { registerRootComponent } from 'expo';

if (__DEV__) {
	activateKeepAwake();
}

registerRootComponent(App);
