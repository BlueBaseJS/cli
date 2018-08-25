import { ExpoFlagDefs, ExpoFlags } from '../../cmd';
import { Utils, init as coreInit } from '@blueeast/bluerain-cli-core';
import { Command } from '@oclif/command';
import fromRoot from '../../scripts/fromRoot';
import fs from 'fs';

const requiredDependencies = [
	'deepmerge',
];

const requiredDevDependencies = [
	'@blueeast/bluerain-cli-essentials',
	'@blueeast/bluerain-storybook-addon',
	'@storybook/addon-actions',
	'@storybook/addon-links',
	'@storybook/react',
	'@types/deepmerge',
	'babel-core@^6.26.3'
];

export default class CustomCommand extends Command {
	static description = 'Initializes a directory with an example project.';

	static examples = [
		`$ bluerain storybook:init`,
	];

	static flags = ExpoFlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as ExpoFlags;

		Utils.logger.log({
			label: '@bluerain/cli/storybook',
			level: 'info',
			message: '🛠 Initializing a new BlueRain + Storybook project...',
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
			label: '@bluerain/cli/storybook',
			level: 'info',
			message: '📂 Creating Storybook configuration directory...',
		});

		await Utils.copyAll(fromRoot('templates/storybook'), Utils.fromProjectRoot(configDir));

		////////////////////////////
		///// Add dependencies /////
		////////////////////////////

		Utils.logger.log({
			label: '@bluerain/cli/storybook',
			level: 'info',
			message: '📦 Installing dependencies...',
		});

		///// Read package.json
		const pkgJsonPath = Utils.fromProjectRoot('package.json');
		const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

		// Modify package.json
		pkgJson.scripts['storybook:start'] = 'bluerain storybook:start';

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
			label: '@bluerain/cli/storybook',
			level: 'info',
			message: '✅ Done! BlueRain Storybook project initialized.',
		});

		return;
	}
}