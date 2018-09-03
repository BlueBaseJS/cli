import { FlagDefs, Flags } from '../../cli-flags';
import { Utils, init as coreInit } from '@blueeast/bluerain-cli-core';
import { requiredDependencies, requiredDevDependencies } from '../../scripts/dependencies';
import { Command } from '@oclif/command';
import fromRoot from '../../scripts/fromRoot';
import fs from 'fs';

export default class CustomCommand extends Command {
	static description = 'Initializes a directory with an example project.';

	static examples = [
		`$ bluerain web:init`,
	];

	static flags = FlagDefs;

	async run() {
		const parsed = this.parse(CustomCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: '🛠 Initializing a new BlueRain Web project...',
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
			label: '@bluerain/cli/web',
			level: 'info',
			message: '📂 Creating web configuration directory...',
		});

		await Utils.copyAll(fromRoot('templates/web'), Utils.fromProjectRoot(configDir));

		////////////////////////////
		///// Add dependencies /////
		////////////////////////////

		// Utils.logger.log({
		// 	label: '@bluerain/cli/web',
		// 	level: 'info',
		// 	message: '📦 Installing dependencies...',
		// });

		///// Read package.json
		const pkgJsonPath = Utils.fromProjectRoot('package.json');
		const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

		// Modify package.json
		if (!pkgJson.scripts) {
			pkgJson.scripts = {};
		}

		pkgJson.scripts['web:start'] = 'bluerain web:start';

		// Update package.json
		fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

		// Install dependencies
		Utils.installMissing(requiredDependencies, false);
		Utils.installMissing(requiredDevDependencies, true);

		// Finish
		Utils.logger.log({
			label: '@bluerain/cli/web',
			level: 'info',
			message: '✅ Done! BlueRain Storybook project initialized.',
		});

		return;
	}
}