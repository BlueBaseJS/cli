import { ExpoFlagDefs, ExpoFlags } from '../../expo';
import { Utils, init as coreInit } from '@blueeast/bluerain-cli-core';
import { Command } from '@oclif/command';
import { getLatestExpoVersion } from '../../scripts/getLatestExpoVersion';
import fromRoot from '../../scripts/fromRoot';
import fs from 'fs';

export default class ExpoStart extends Command {
	static description = 'Initializes a directory with an example project.';

	static examples = [
		`$ bluerain expo:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(ExpoStart);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '🛠 Initializing a new BlueRain + Expo project...',
		});

		// Absolute path of build dir
		const configDir = Utils.fromProjectRoot(flags.configDir);
		const buildDir = Utils.fromProjectRoot(flags.buildDir);

		// core
		// - copy common folder
		// - copy tsconfig + tslint
		await coreInit(configDir, buildDir);

		///////////////////////////////
		///// Copy Template Files /////
		///////////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '📂 Creating Expo configuration directory...',
		});

		await Utils.copyAll(fromRoot('templates/expo'), Utils.fromProjectRoot(configDir));

		////////////////////////////
		///// Add dependencies /////
		////////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '📦 Installing dependencies...',
		});

		const expoVersion = getLatestExpoVersion();

		///// Read package.json
		const pkrJsonPath = Utils.fromProjectRoot('package.json');
		const pkrJsonBuffer = fs.readFileSync(pkrJsonPath);
		const pkrJson = JSON.parse(pkrJsonBuffer.toString());

		// Modify package.json
		pkrJson.dependencies.expo = `^${expoVersion.expo}`;
		pkrJson.dependencies['react-native'] = expoVersion.reactNative;
		pkrJson.scripts['expo:start'] = 'bluerain expo:start';

		// Update package.json
		fs.writeFileSync(pkrJsonPath, JSON.stringify(pkrJson, null, 2));

		// Install dependencies
		const depsToInstall = [];
		const devDepsToInstall = [];

		if (!pkrJson.dependencies.deepmerge) {
			depsToInstall.push('deepmerge');
		}

		if (!pkrJson.devDependencies['@types/deepmerge']) {
			devDepsToInstall.push('@types/deepmerge');
		}

		if (!pkrJson.devDependencies['react-native-typescript-transformer']) {
			devDepsToInstall.push('react-native-typescript-transformer');
		}

		if (depsToInstall.length > 0) {
			Utils.install({ deps: depsToInstall, dev: false });
		}

		if (devDepsToInstall.length > 0) {
			Utils.install({ deps: devDepsToInstall, dev: true });
		}

		// Finish
		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '✅ Done! BlueRain + Expo project initialized.',
		});

		return;
	}
}