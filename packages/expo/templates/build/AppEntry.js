import App from './<%= APP_JS_PATH %>';
import { activateKeepAwake } from 'expo-keep-awake';
import { registerRootComponent } from 'expo';

if (__DEV__) {
	activateKeepAwake();
}

registerRootComponent(App);
