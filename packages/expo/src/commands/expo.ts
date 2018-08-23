import { Command, flags } from '@oclif/command';
import { build, start } from '../actions';
import getConfigFiles from '../configFiles';
import { ConfigFileInfo } from '@blueeast/bluerain-cli-core';

export interface ExpoFlags {
	buildDir: string;
	configDir: string;
}

export default class Expo extends Command {
	static description = 'Brings BlueRain projects to expo platform';

	static examples = [
		`$ bluerain expo start`,
	];

	static args = [{
		default: 'start',              // default value if no arg input
		name: 'action',                  // name of arg to show in help and reference with args[name]
		options: ['build', 'start'],           // only allow input to be from a discrete set
		required: true,               // make the arg required with `required: true`
    // description: 'The action to perform ', // help description
    // hidden: true,                  // hide this arg from help
    // parse: input => 'output',      // instead of the user input, return a different value
	}];

	static flags = {
		configDir: flags.string({
			// char: 'c',                    // shorter flag version
			description: 'Path to config directory relative to the root directory', // help description for flag
			hidden: false,                // hide from help
			multiple: false,              // allow setting this flag multiple times
			env: 'CONFIG_DIR',               // default to value of environment variable
			// parse: input => 'output',     // instead of the user input, return a different value
			default: './bluerain/expo',             // default value if flag not passed
			required: false,              // make flag required (this is not common and you should probably use an argument instead)
		}),

		buildDir: flags.string({
			// char: 'b',                    // shorter flag version
			description: 'Path to build directory relative to the root directory', // help description for flag
			hidden: false,                // hide from help
			multiple: false,              // allow setting this flag multiple times
			env: 'BUILD_DIR',               // default to value of environment variable
			// parse: input => 'output',     // instead of the user input, return a different value
			default: './build/expo',             // default value if flag not passed
			required: false,              // make flag required (this is not common and you should probably use an argument instead)
		}),

	}

	public configFiles: ConfigFileInfo[] = [];
	// static configFiles = ConfigFiles;

	async run() {
		const { args, flags } = this.parse(Expo);

		// Initialize file manager through 'prexec' hook
		this.configFiles = getConfigFiles(flags.configDir as string);
		await this.config.runHook('preexec', { inputs: this.parse(Expo), command: this });

		if (args.action === 'build') {
			await build(this);
		} else if (args.action === 'start') {
			await start(this, flags as ExpoFlags);
		}
	}
}
