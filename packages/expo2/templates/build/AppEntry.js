import { KeepAwake, registerRootComponent } from 'expo';
import App from '<%= APP_JS_PATH %>';

if (__DEV__) {
	KeepAwake.activate();
}

registerRootComponent(App);
