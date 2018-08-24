import { Utils } from "@blueeast/bluerain-cli-core";
import detectInstalled from 'detect-installed';
import install from 'yarn-install';

/**
 * This package is required to build react native with typescript.
 * Because of the way oclif is made, it doesn't install packages in 
 * project directory. That's why we need to have this dirty hack. 
 * Otherwise it wouldv'e been better to just install this package here
 * and just import it in app.json.
 */
export default async () => {
	const isTransformerInstalled = await detectInstalled('react-native-typescript-transformer', { local: true });

	if (!isTransformerInstalled) {

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🎛 react-native-typescript-transformer not found, installing now...',
		});

		install({ deps: ['react-native-typescript-transformer'], dev: true })
	}
};