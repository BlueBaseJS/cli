import { ExpoFlagDefs, ExpoFlags } from '../../expo';
import { Utils, init as coreInit } from '@blueeast/bluerain-cli-core';
import { Command } from '@oclif/command';
import { getLatestExpoVersion } from '@blueeast/bluerain-cli-expo';
import fromRoot from '../../scripts/fromRoot';
import fs from 'fs';
import path from 'path';

const requiredDependencies = [
	'deepmerge',
];

const requiredDevDependencies = [
	'@blueeast/bluerain-storybook-addon',
	'@storybook/addon-actions',
	'@storybook/addon-links',
	'@storybook/react-native',
	'@types/deepmerge',
	'react-native-storybook-loader',
	'react-native-typescript-transformer',
];

export default class CustomCommand extends Command {
	static description = 'Initializes a directory with an example project.';

	static examples = [
		`$ bluerain storybook-native:start`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '🛠 Initializing a new BlueRain + Storybook Native project...',
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
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '📂 Creating Storybook configuration directory...',
		});

		await Utils.copyAll(fromRoot('templates/storybook-native'), Utils.fromProjectRoot(configDir));

		////////////////////////////
		///// Add dependencies /////
		////////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '📦 Installing dependencies...',
		});

		const expoVersion = getLatestExpoVersion();

		///// Read package.json
		const pkgJsonPath = Utils.fromProjectRoot('package.json');
		const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

		// Modify package.json
		pkgJson.dependencies.expo = `^${expoVersion.expo}`;
		pkgJson.dependencies.react = (!pkgJson.dependencies.react) ? `^${expoVersion.react}` : pkgJson.dependencies.react;
		pkgJson.dependencies['react-native'] = expoVersion.reactNative;
		pkgJson.scripts['storybook-native:start'] = 'bluerain storybook-native:start';

		// Storybook loader configs
		let pkgJsonTemplateStr = fs.readFileSync(fromRoot('templates/package.template.json')).toString();
		pkgJsonTemplateStr = pkgJsonTemplateStr.replace(
			new RegExp('CONFIG_DIR_PATH', 'g'),
			path.relative(Utils.fromProjectRoot(), configDir)
		);

		const pkgJsonTemplate = JSON.parse(pkgJsonTemplateStr);

		if (!pkgJson.config) {
			pkgJson.config = {};
		}

		pkgJson.config['react-native-storybook-loader'] = pkgJsonTemplate.config['react-native-storybook-loader'];

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
			label: '@bluerain/cli/storybook-native',
			level: 'info',
			message: '✅ Done! BlueRain + Expo project initialized.',
		});

		return;
	}
}