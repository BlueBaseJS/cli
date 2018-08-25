import { ExpoFlagDefs, ExpoFlags } from '../../expo';
import { Utils, init as coreInit } from '@blueeast/bluerain-cli-core';
import { Command } from '@oclif/command';
import { getLatestExpoVersion } from '../../scripts/getLatestExpoVersion';
import fromRoot from '../../scripts/fromRoot';
import fs from 'fs';

const requiredDependencies = [
	'deepmerge',
];

const requiredDevDependencies = [
	'@types/deepmerge',
	'react-native-typescript-transformer',
];

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
		const pkgJsonPath = Utils.fromProjectRoot('package.json');
		const pkgJsonBuffer = fs.readFileSync(pkgJsonPath);
		const pkgJson = JSON.parse(pkgJsonBuffer.toString());

		// Modify package.json
		pkgJson.dependencies.expo = `^${expoVersion.expo}`;
		pkgJson.dependencies['react'] = (!pkgJson.dependencies['react']) ? `^${expoVersion.react}` : pkgJson.dependencies['react'];
		pkgJson.dependencies['react-native'] = expoVersion.reactNative;
		pkgJson.scripts['expo:start'] = 'bluerain expo:start';

		// Update package.json
		fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

		// Install dependencies
		const depsToInstall: string[] = [];
		const devDepsToInstall: string[] = [];

		requiredDependencies.forEach(dep => {
			if (!pkgJson.dependencies[dep]) {
				depsToInstall.push(dep);
			}
		});

		requiredDevDependencies.forEach(dep => {
			if (!pkgJson.dependencies[dep]) {
				devDepsToInstall.push(dep);
			}
		});

		if (depsToInstall.length > 0) {
			Utils.install({ deps: depsToInstall, dev: false });
		}

		// We force install, because we need to install expo, and react-native
		Utils.install({ deps: devDepsToInstall, dev: true });

		// Finish
		Utils.logger.log({
			label: '@bluerain/cli/expo',
			level: 'info',
			message: '✅ Done! BlueRain + Expo project initialized.',
		});

		return;
	}
}