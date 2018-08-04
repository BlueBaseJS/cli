import { ConfigRegistry, FileRegistry } from '../registrys';
import { Command } from './Command';
import { ConfigFileInfo } from './ConfigFiles';
import { LaunchPad } from '../LaunchPad';
import Debug from 'debug';

const debug = Debug('Engine');

type CommandStore = { [key: string]: Command };

/**
 * An Engine is an implemetation of an application platform.
 * i.e. Web, Electron, Expo, etc
 */
export class Engine {
	/** Engine name */
	public name?: string;

	/** Slug, used as a key */
	public slug?: string;

	/** Configuration files to load */
	public configFiles: ConfigFileInfo[] = [];

	/** All commands of this engine */
	public commands?: CommandStore;

	/** Holds all configurations */
	public Configs = new ConfigRegistry(this);

	/** All files to be loaded and process. */
	public Files = new FileRegistry(this);

	constructor(public LP: LaunchPad) {

		// Search relevant files (& hooks) as required
		// by this engine.
		this.Files.addMany(this.configFiles);
	}

	/**
	 * Does the following:
	 * - Registers all hooks from various files across project.
	 * - Loads all engine specific configs from platform.js
	 *
	 * An Engine implementation may extend this to add more functionality
	 */
	public async prepare() {
		debug(`Preparing engine: ${this.slug}`);

		// Load the relevant hook as required
		// by this engine.
		await this.Files.registerHooks();

		// Look up platform configs
		const engineConfigs = this.LP.Filters.run('engine.web.file.platform', {}, this);

		// Extract engine configs, as platform.js file has configs of all engines
		const slug = this.slug as string;
		let configs = engineConfigs[slug] || {};

		// =[ System Lifecycle Event ]= Configs Initailzed
		configs = this.LP.Filters.run('bluerain.cli.engine.configs', configs, this);
		this.Configs.registerMany(configs);
	}

	/**
	 * Run a command
	 */
	public run = async (args: { command: string, options?: object }): Promise<void> => {
		if (!this.commands || this.commands[args.command]) {
			throw Error(`A command with the slug ${args.command} doesn't exist`);
		}

		return this.commands[args.command].handler(args.options || {});
	}

	// /**
	//  * Add a new command to the engine
	//  * @param command
	//  */
	// public addCommand(command: Command) {
	// 	const slug = command.slug;

	// 	if (!slug) {
	// 		throw Error(`Command has no slug`);
	// 	}

	// 	if (this.commands[slug]) {
	// 		throw Error(`A command with the slug ${slug} already exists`);
	// 	}

	// 	this.commands[slug] = command;
	// }

	// /**
	//  * Remove a command
	//  * @param slug
	//  */
	// public removeCommand(slug: string) {

	// 	if (!this.commands[slug]) {
	// 		throw Error(`A command with the slug ${slug} doesn't exist`);
	// 	}

	// 	delete this.commands[slug];
	// }

	// /**
	//  * Get all commands
	//  */
	// public getCommands = (): CommandStore => {
	// 	return this.commands;
	// }
}
