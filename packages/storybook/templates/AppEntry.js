import { KeepAwake, registerRootComponent } from 'expo';
import App from './STORYBOOK_APP_PATH';

if (__DEV__) {
	KeepAwake.activate();
}

registerRootComponent(App);
